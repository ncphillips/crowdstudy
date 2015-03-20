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

// Tells the application to look for views in `./views` before looking in the global views folder..
app.set('views', __dirname+'/views');

// Static files are in ./public and are available at this route.
// Example:
//      <script type="text/jsx" src="/examples/scripts/ExampleButton.jsx"></script>
//      <script type="text/jsx" src="scripts/ExampleInput.jsx"></script>
app.use(express.static(__dirname + '/public'));

// Loads this application's routes.
require('./routes.js')(app);

module.exports = app;