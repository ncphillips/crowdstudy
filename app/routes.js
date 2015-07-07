'use strict';

var controllers = require('./controllers');

module.exports = function (app) {
  app.get('/', controllers.index);

  app.get('/survey', controllers.survey);
  app.get('/noComparisonSurvey', controllers.survey);
  app.get('/consent', controllers.consent);

};
