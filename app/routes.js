'use strict';

var auth = require('../lib/middleware/authentication');
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

  app.post('/worker/submit',
    worker.get_or_create,
    auth.generate_confirmation_code,
    worker.submit_experiment_results,
    function (req, res) {
      res.json(req.context.worker);
    }
  );

  app.get('/survey', controllers.survey);
  app.get('/consent', controllers.consent);

  //app.post('/worker/:id/experiment', worker.register_for_experiment);
  //app.get('/worker/:worker_id');
  //app.get('/worker/:worker_id/revokeConsent/');


  //app.get('/crowdflower', crowdflower.webhook);
};
