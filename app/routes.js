'use strict';

var controllers = require('./controllers');
var worker = require('../lib/middleware/worker');
var crowdflower = require('../lib/middleware/crowdflower');

worker.get_or_create
module.exports = function (app) {
  app.get('/', controllers.index);

  // Workera API
  //app.get('/api/worker', worker.list, function (req, res) {
  //  res.send(req.context.workers);
  //});

  app.post('/worker/register', worker.get_or_create, worker.register_for_experiment, function (req, res) {
    res.json(req.context.worker);
  });

  //app.post('/worker/:id/experiment', worker.register_for_experiment);
  //app.get('/worker/:worker_id');
  //app.get('/worker/:worker_id/revokeConsent/');


  //app.get('/crowdflower', crowdflower.webhook);
};
