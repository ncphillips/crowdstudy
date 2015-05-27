'use strict';

module.exports = function worker_list(req, res, next) {
  req.db.collection('workers').find().toArray(function (err, workers) {
    if (err) return next(err);
    req.context.workers = workers;
    next();
  });
};