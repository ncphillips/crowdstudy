exports.crowdflower = {};
exports.mturk = {};

exports.list = function (req, res, next) {
    req.db.collection('workers').find().toArray(function (err, workers) {
        if (err) return next(err);
        req.context.workers = workers;
        next();
    });
};

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
            req.context.worker = worker;
            next();
        }

        // In this second case, we must create the worker doc,
        // as well as store the experiment information.
        else {
            worker.id = req.body.worker_id;
            worker.platform = req.body.platform;
            workers.insert(worker, function (err, worker) {
                req.context.worker = worker;
                next();
            });
        }

    });
};

exports.crowdflower.give_bonus = function (req, res, next) {
    /**
     * @todo Give Crowdflower worker a bonus.
     */
    next();
};

exports.mturk.approve_hit = function (req, res, next) {
    /**
     * @todo Approve HIT middleware
     */
    next();
};