/* jslint node: true */
'use strict';
var PAYMENT = 74;

var MongoClient = require('mongodb').MongoClient;
var controllers = require('./controllers');
var crowdflower = require('crowdstudy_crowdflower_api');
var async = require('async');
var log = global.log;
var config = require('../config');

module.exports = function (app) {
  app.get('/', controllers.index);

  app.get('/survey', controllers.survey);
  app.get('/noComparisonSurvey', controllers.no_comparison_survey);
  app.get('/comparisonSurvey', controllers.comparison_survey);
  app.get('/consent', controllers.consent);

  app.post('/webhook',
    crowdflower.middleware.webhook.parsePayload,
    function findJudgments(req, res, next) {
      req.judgments = req.payload.results.judgments;
      next();
    },
    function parseWorkRecords(req, res, next) {
      req.work_records = [];
      req.judgments.forEach(function (judgment, index) {
        var experiments = ['pointing_task', 'whack_a_mole', 'writing_task'];
        experiments.map(function (experiment) {
          var code = judgment.data[experiment + '_code'];
          if (code) {
            req.work_records.push({
              job_id: judgment.job_id,
              experiment: experiment,
              worker_id: judgment.worker_id,
              code: code
            });
          }
        });
      });
      next();
    },
    function verifyWorkRecords(req, res, next) {
      var workers = req.db.collection('workers');
      var count = 0;
      async.forEachSeries(req.work_records, function (wr, callback) {
        workers.find({id: ""+wr.worker_id}).toArray(function (err, workers) {
          if (err) {
            log.error('Work Record Error for Crowdflower Worker ', wr.worker_id, ': ', err);
          }
          else if (workers.length < 1) {
            log.error('Work Record Error for Crowdflower Worker ', wr.worker_id, ': Not Found.');
          }
          else if (workers.length > 1) {
            log.error('Work Record Error for Crowdflower Worker ', wr.worker_id, ': ' + workers.length + ' Found.');
          }
          else {
            var worker = workers[0];
            var experiment = worker.experiments[wr.experiment];
            req.work_records[count].giveBonus = experiment.code === wr.code && !experiment.paid;
          }
          count++;
          callback();
        });
      }, next);
    },
    function giveBonuses(req, res, next) {
      req.work_records.forEach(function (wr, i) {

        var r = {
          job_id: wr.job_id,
          worker_id: wr.worker_id,
          apiKey: require('../cf_api_key')
        };

        if (wr.giveBonus) {
          r.amount = PAYMENT;
          r.reason = "Thank you for completing our task!";
          setTimeout(function () {
            crowdflower.middleware.workers.bonus(r, {}, function (err) {
              if (err) {
                log.error(err);
              }
              var connection_options = {
                server: { socketOptions: { connectTimeoutMS: 1000, socketTimeoutMS: 1000 }, auto_reconnect: false }
              };
              MongoClient.connect(config.server.db, connection_options,  function (err, db) {
                if (!err) {
                  db.collection('workers').find({id: "" + wr.worker_id}).toArray(function (err, workers) {
                    if (err || !workers.length) {
                      console.log("Failed to mark worker as paid:", wr.worker_id);
                    }
                    else {
                      var worker = workers[0];
                      worker.experiments[wr.experiment].paid = true;
                      db.collection('workers').update({_id: worker._id}, worker, function (a, b, c) {
                        console.log(a, b, c);
                        db.close();
                      });
                    }
                  });
                }
              });
            });
            log.info("BONUS: " + r.worker_id + " | AMOUNT: " + r.amount);
          }, 1000 * i);
        }
        else {
          r.reason = "Sorry. You failed to provide a valid code.";
          setTimeout(function () {
            crowdflower.middleware.workers.reject(r, {}, function (err) { if (err) { log.error(err); } });
            log.info("REJECT: " + r.worker_id + " | REASON: " + r.reason);
          }, 1000 * i);
        }
      });
      next();
    },
    function (req, res) {
      res.status(200).send(req.work_records);
    }
  );

};
