'use strict';

module.exports = function register_for_experiment(req, res, next) {
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