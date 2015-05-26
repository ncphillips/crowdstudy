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
    var query = {
      id: req.body.worker_id,
      platform: req.body.platform
    };

    workers.find(req.body).toArray(function (err, docs) {
        if (err) return next(err);
        if (!req.context) req.context = {};

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
            worker.experiments = {};
            workers.insert(worker, function (err, worker) {
                req.context.worker = worker[0];
                next();
            });
        }

    });
};

exports.register_for_experiment = function (req, res, next) {
  var workers = req.db.collection('workers');
  var worker = req.context.worker;
  var experiment_name = req.body.experiment_name;

  if (!worker) return next(new Error('No worker found.'));
  if (!experiment_name) return next(new Error('Experiment no specified.'));

  if (!worker.experiments.hasOwnProperty(experiment_name)) {
    experiments = worker.experiments;
    experiments[experiment_name] = {
      consent: null,
      completed: null
    };

    workers.update({_id: worker._id}, {$set: {experiments: experiments}}, function (err) {
      if (err) return next(err);
      worker.experiments = experiments;
      req.context.worker = worker;
      next();
    });
  }
  else next();
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