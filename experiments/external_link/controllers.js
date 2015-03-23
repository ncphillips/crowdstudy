'use strict';

/**
 * @description
 * <p>
 *     Returns a Survey form for Crowdflower users to fill out.
 * </p>
 * <code>
 * {
 *      id: 12345,
 *      platform: 'Crowdflower',
 *      experiments: {
 *          external_link: {
 *              yob: 1992,
 *              name: "Nolan Phillips",
 *              code: "1234567890abcdef",
 *              headers: { ... }
 *          }
 *      }
 * }
 * </code>
 * @param req
 * @param res
 */
exports.get_form = function (req, res) {
    var errors = {
        worker_id: [],
        name: [],
        yob: []
    };

    res.render('survey', {errors: errors});
};

/**
 * Validates form data and then stores the results in the Workers record.
 *
 * @param req
 * @param res
 */
exports.post_form = function (req, res) {
    /**
     * Callback used to respond to the POST.
     *
     * @param err
     * @param result
     */
    function respond(err, result) {
        if (err) {
            console.log(err);
            res.render('error_page');
        }
        else {
            res.render('code_page', {code: code});
        }
    }

    // Here we're checking to see if there are any validation errors that we should be sending back to the user.
    var errors = {
        worker_id: [],
        name: [],
        yob: []
    };

    if (!req.body.worker_id) errors.worker_id.push('Please provide your Crowdflower ID');
    if (!req.body.name) errors.name.push('Please provide your name.');
    if (!req.body.yob) errors.yob.push('Please provide your Year of Birth.');

    if (errors.worker_id || errors.name || errors.yob) {
        res.render('survey', {errors: errors})
    }
    // If there aren't, then we'll start se
    else {
        var workers_collection = req.db.collection('workers');



        workers_collection.find({id: req.body.worker_id}).toArray(function (err, workers) {
            var worker = null;
            var code = generateCode();

            // If anything goes wrong, the error page is rendered.
            if (err) {
                console.log(err);
                res.render('error_page');
            }
            // If there is no record of that worker, a new record is created with all the information we need.
            else if (workers.length === 0) {
                console.log('Creating new Worker...');
                worker = {
                    platform: 'crowdflower',
                    id: req.body.worker_id,
                    experiments: {
                        external_link: {
                            name: req.body.name,
                            yob: req.body.yob,
                            headers: req.headers,
                            code: code
                        }
                    }
                };
                workers_collection.insert(worker, respond);
            }
            else {
                console.log('Existing Worker found...');
                worker = workers[0];
                workers_collection.update({_id: worker._id}, {$set: {external_link: {
                    name: req.body.name,
                    yob: req.body.yob,
                    headers: req.headers,
                    code: code
                }}}, respond);

            }
        });
    }
};

/**
 * Generates an alpha-numeric code for validating Workers judgments.
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
 * Receives Crowdflower webhook notices and validates Workers judgments.
 *
 * @param req
 * @param res
 */
exports.webhook = function (req,res) {
    if (req.body.signal === 'unit_complete') {
        var workers_collection = req.db.collection('workers');
        var payload = JSON.parse(req.body.payload);

        payload.results.judgments.forEach(function(judgment) {
            var worker_id = judgment.worker_id;
            console.log('Validating work done by: ' + worker_id);

            var code = judgment.data.code;

            workers_collection.find({id: worker_id}).toArray(function (err, docs) {
                if (err) {
                    res.status(200).send();
                }
                else if (docs.length === 1) {
                    console.log(docs);
                    var worker = docs[0];
                    if (worker.code === code) {
                        console.log('Code matched – Give worker a bonus!');
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
