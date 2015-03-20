'use strict';
var controllers = require('./controllers');

/**
 * Adds new routes to the application passed in.
 * @param app
 */
module.exports = function (app) {
    app.get('/', controllers.get_form);
    app.post('/', controllers.post_form);
    app.post('/webhook', controllers.webhook);
};