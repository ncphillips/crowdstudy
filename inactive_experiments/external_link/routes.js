'use strict';
var controllers = require('./controllers');

/**
 * Adds new routes to the application passed in.
 * @param app
 */
module.exports = function (app) {

    app.get('/', controllers.setContext, controllers.getForm);

    app.post('/', controllers.setContext, controllers.validateForm, controllers.saveWork, controllers.showCode);

    app.post('/webhook', controllers.webhook);

};


