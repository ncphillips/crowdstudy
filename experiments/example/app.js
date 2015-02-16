'use strict';
/**
 * @module Example Experiment
 * @description
 * A simple example of an experiment Express app.
 *
 *
 *
 */
var express = require('express');
var app = express();

// Experiment Views
app.set('views', __dirname+'/views');

// Experiments Routes
require('./routes.js')(app);

module.exports = app;