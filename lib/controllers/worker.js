exports.get_or_create = function (req, res, next) {
    var workers = req.db.collection('workers');

    workers.find({id: req.body.worker_id}).toArray(function (err, docs) {
        if (err) return next(err);

        var worker = {};

        // This first case occurs if the worker has already taken part
        // in one of our experiments. We simple add the results to his list
        // of experiments and we're good to go.
        if (docs.length > 0) {
            worker = docs[0];
            req.worker = worker;
            next();
        }

        // In this second case, we must create the worker doc,
        // as well as store the experiment information.
        else {
            worker.id = req.body.worker_id;
            worker.platform = req.body.platform;
            workers.insert(worker, function (err, worker) {
                req.worker = worker;
                next();
            });
        }

    });
};