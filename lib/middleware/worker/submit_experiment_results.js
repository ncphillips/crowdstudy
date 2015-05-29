'use strict';

module.exports = function (req, res, next) {
  var workers = req.db.collection('workers');

  var experiment_name = req.body.experiment_name;
  var experiment = req.body.experiment;
  experiment.code = req.confirmation_code;

  req.context.worker.experiments[experiment_name] = experiment;
  var query = {
    id: req.body.worker.id,
    platform: req.body.worker.platform,
  };
  workers.update(query, req.context.worker, function (err, result) {
    if (err) return next(err);
    console.log(result);
    next();
  });
};
