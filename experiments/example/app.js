'use strict';

/**
 * @module Example Experiment
 * @description
 * <p>
 *     This is an example Experiment sub-application consisting of routes,
 *     controllers, and views.
 * </p>
 */

var express = require('express');
var app = express();

// Tell the application to look for views in `./views`
app.set('views', __dirname+'/views');

// Load the routes for this application.
require('./routes.js')(app);

module.exports = app;