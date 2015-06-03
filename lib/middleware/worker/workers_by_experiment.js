module.exports = function workers_by_experiment(req, res, next) {
  var workers = req.db.collection('worker');
  var experiment_name = req.experiment_name;
  workers.findAll({experiments: {experiment_name: {"$exists": true}}}, function (err, docs) {
    if (err) return next(err);
    req.context.workers = docs;
    next();
  });
};
