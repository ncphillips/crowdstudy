'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Renders the Survey JSX to static HTML.
 *
 * @param req
 * @param res
 */
exports.getForm = function (req, res) {
    res.render('story', req.context);
};


/**
 * Sets the context for the Survey from the URL/Form data.
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.setContext = function(req, res, next) {
    var context = {
        errors: {}
    };

    if (req.query.platform === 'crowdflower') {
        context.platform = 'crowdflower';
    }
    else if (req.query.platform === 'mturk' && (req.query.hitId || req.body.hitId)) {
        context.platform = 'mturk';

        // This is camelcase because mTurk does camel case.
        // The hitId is originally passed in by the URL, but it's added to the form as
        // an extra hidden field. This is just to try and catch it if the URL query
        // gets removed.
        context.hitId = req.query.hitId || req.body.hitId;
    }
    else {
        return res.render('error_page');
    }
    req.context = context;
    return next();
};


/**
 * Validates the submitted Survey form. If invalid, the form is re-rendered with
 * any errors that were generated.
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.validateForm = function (req, res, next){
    if (!req.body.name) req.context.errors.name = 'Please supply your name.';
    if (!req.body.yob) req.context.errors.yob = 'Please supply your year of birth.';
    if (!req.body.worker_id) req.context.errors.worker_id = 'Please supply your worker id.';

    // If any errors get generated, then we're going to render the survey again so the
    // errors can be displayed to the worker.
    var num_errors = Object.getOwnPropertyNames(req.context.errors).length;
    if (num_errors > 0) {
        return res.render('story', req.context);
    }

    next();
};


/**
 * Get or Creates a Worker document and saves submitted experiment information.
 *
 * @param req
 * @param res
 * @param next
 */
exports.saveWork = function (req, res, next) {
    var workers = req.db.collection('workers');

    workers.find({id: req.body.worker_id}).toArray(function (err, docs) {
        if (err) { return res.render('error_page'); }

        var experiment = { };
        experiment.name = req.body.name;
        experiment.yob = req.body.yob;
        experiment.code = req.context.code = generateCode();

        // Mechanical Turk
        // We need to store this immediately, because mTurk requires us to manually
        // retrieve the HITs which must be approved.
        experiment.hitId = req.context.hitId;

        // Crowdflower
        // This value will get set later on once we receive the Judgment from Crowdflower.
        experiment.judgmentId = '';

        var worker = {};

        var saveHitId = function (err) {
            if (err) return next(err);
            if (experiment.hitId) {
                // Append Hit ID
                console.log(experiment.hitId);
                fs.appendFile('experiments/external_link/external_link.success', '\n' + experiment.hitId, function (err) {
                    console.log(err);
                    if (err) next(err);
                    else next();
                });
            }
            else next();
        };

        // This first case occurs if the worker has already taken part
        // in one of our experiments. We simple add the results to his list
        // of experiments and we're good to go.
        if (docs.length > 0) {
            worker = docs[0];
            worker.experiments.external_link = experiment;
            workers.update({_id: worker._id}, worker, saveHitId);
        }

        // In this second case, we must create the worker doc,
        // as well as store the experiment information.
        else {
            worker.id = req.body.worker_id;
            worker.platform = req.body.platform;
            worker.experiments = {};
            worker.experiments.external_link = experiment;
            workers.insert(worker, saveHitId);
        }
    });
};


/**
 * Generates an alpha-numeric code for validating Workers judgments.
 *
 * Uses a simple regex: ^[a-zA-Z0-9]*$
 *
 * @returns {string}
 */
function generateCode() {
    // The mask contains all of the valid characters for the code. A regex for
    // this code would be `^[a-zA-Z0-9]*$`. It would be a good idea to get a
    // better regex so a bit more validation could happen on the Crowdflower end.
    var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // The result variable will hold the code. One character will be used at a time.
    var result = '';
    for (var length = 16; length > 0; --length)
        result += mask[Math.round(Math.random() * (mask.length - 1))];

    return result;
}


/**
 * Renders teh page which displays the code generated for the worker who completed the Survey.
 *
 * @param req
 * @param res
 */
exports.showCode = function (req, res){
    res.render('code_page', req.context);
};



/**
 * Gives a Crowdflower worker a bonus.
 *
 * @param worker_id
 */
function crowdflowerBonus(worker_id) {
    // Currently in Stub mode.

}


/**
 * Receives Crowdflower webhook notices and validates Workers judgments.
 *
 * @param req
 * @param res
 */
exports.webhook = function (req,res) {
    if (req.body.signal === 'unit_complete') {
        // Connect to the Worker collection in the database.
        var workers_collection = req.db.collection('workers');

        // For some reason the Crowdflower payload is in a string, so
        // the body-parser does parse it. No big deal.
        var payload = JSON.parse(req.body.payload);

        // So we want to iterate through every judgment received,
        // and make sure all of these workers actually did our survey.
        payload.results.judgments.forEach(function(judgment) {
            var worker_id = judgment.worker_id;
            var code = judgment.data.code;

            console.log('Validating work done by: ' + worker_id);

            workers_collection.find({id: worker_id}).toArray(function (err, docs) {
                if (err) {
                    res.status(200).send();
                }
                else if (docs.length === 1) {
                    // To do this, we look up the worker with the given id,
                    // and if the code we stored for him matches the code he
                    // submitted on Crowdflower, we give a bonus.
                    var worker = docs[0];
                    if (worker.code === code) {
                        console.log('Code matched – Give worker a bonus!');
                        if (worker.platform === 'crowdflower')
                            crowdflowerBonus(worker.id);
                    }
                    else {
                        console.log('Code mismatch – No bonus for that worker!')
                    }
                }
            });

        });
    }
    res.status(200).send();
};




