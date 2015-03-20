'use strict';

/**
 * @description
 * <p>
 *     An example controller function. It renders the view located at 'views/index.jsx'.
 * </p>
 *
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
 * @param req
 * @param res
 */
exports.get_form = function (req, res) {
    // Render a JSX view and sent it as a response.
    res.render(
        // Specifies the view, which is located at ./views/index.jsx
        'index',
        // Context object.
        { title: 'External Survey Example'}
    );
};

exports.post_form = function (req, res) {
    // So we're going to connect to the workers collection, and then see
    // if this worker has ever been a part of our experiment.
    var workers_collection = req.db.collection('workers');

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
            console.log('Worker info saved.');
            res.render('code_page', {code: code});
        }
    }

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



};

function generateCode() {
    var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';

    for (var length = 16; length > 0; --length)
        result += mask[Math.round(Math.random() * (mask.length - 1))];

    return result;
}

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
