var WorkerCtrl = require('./worker');
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
            var experiment = judgment.data.experiment;

            console.log('Validating work done by: ' + worker_id);

            workers_collection.find({id: worker_id}).toArray(function (err, docs) {
                if (docs.length === 1) {
                    // To do this, we look up the worker with the given id,
                    // and if the code we stored for him matches the code he
                    // submitted on Crowdflower, we give a bonus.
                    var worker = docs[0];

                    /**
                     * @todo More checking.
                     */
                    if (worker.experiments[experiment].code === code) {
                        WorkerCtrl.crowdflower.give_bonus(req, res, next);
                    }
                }
            });

        });
    }
    res.status(200).send();
};
