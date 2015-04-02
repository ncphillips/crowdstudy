'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Renders the StoryTime app.
 *
 * @param req
 * @param res
 */
exports.renderApp = function (req, res) {
    res.render('index', req.context);
};


/**
 * Sets the context for the Short Stories app from the URL/Form data.
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
        return res.render('error');
    }

    req.context = context;
    return next();
};



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




