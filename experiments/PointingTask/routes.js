'use strict';
var workers = require('../../lib/controllers/worker'); // Crowd Study Controllers
var controllers = require('./controllers'); // Experiment Controllers

/**
 * Adds new routes to the application passed in.
 * @param app
 */
module.exports = function (app) {
    app.get('/', controllers.renderPointingTaskApp);

};


