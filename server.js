'use strict';

// Server Modules
var http = require('http');
var https = require('https');

// Express JS
var express = require('express');

// Middleware Modules
var body_parser = require('body-parser');
var response_time = require('response-time');
var session = require('express-session');

// Used for finding files with regex.
var glob = require('glob');

// Debugging
var debug = require('express-debug');

// Create the App
var app = express();

// A global `log` object using a `bunyan` logger.
global.log = require('bunyan').createLogger({name: 'CrowdStudy'});

// Configuration
var config = require('./config');

// HTTP or HTTPS
var server = null;
if (config.server.use_https) {
    server = https.createServer(config.server.https_options, app);
}
else {
    server = http.createServer(app);
}

// Application variables
app.locals.title = config.title;
app.locals.email = config.email;

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

// Middleware
// app.use(session());
app.use(response_time());
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

// This tells express where static files can be served from.
app.use(express.static(__dirname + '/public'));

// EJS view engine
app.set('view engine', 'ejs');

// When running the application in the development environment, this middleware will
// send a full stack trace to the client when errors occur.
if (app.get('env') == 'development') {
    app.use(require('errorhandler')());
}

// MongoDb is used as the database.
// A connection to Mongo is created every time there is a new request.
// An object representing that connection is assigned to `req.db` for
// the controllers to use.
var MongoClient = require('mongodb').MongoClient;
app.use(function (req, res, next) {
    MongoClient.connect(config.server.db, function (err, db) {
        if (err) {
            log.error(err);
            return next(err);
        }

        req.db = db;
        next();
    });
});

// Application View Files
app.set('views', __dirname+'/app/views');

// Main Routes
require('./app/routes')(app);

// Register Experiments
log.info('Loading Sub-Applications');
var experiments = glob.sync('experiments/**/app.js');
experiments.forEach(function (path, n) {
    var path_a= path.split('/');
    var name = path_a[path_a.length-2];
    var experiment = require('./' + path);

    // Add to experiment list
    global.experiments.push(name);

    // Use the experiment on i
    app.use('/' + name, experiment.app);

    if (experiment.sockets) experiment.sockets(config, server);

    log.info('\t %s - %s', n+1, name);
});

config.INSTALLED_APPS.forEach(function (name) {
		var subapp = require(name).app;
    var endpoint = name.replace('crowdstudy_', '');
		app.use('/' + endpoint, subapp);
    log.info('\t %s', endpoint);
});

// @todo – Just load experiments in the config.

// When in the development environment, this provides a tab with some
// application info in it.
//debug(app);

server.listen(config.server.port, function () {
    var protocol = config.server.use_https ? 'https' : 'http';
    var host = server.address().address;
    var port = server.address().port;

    log.info('Server Listening at %s://%s:%s', protocol, host, port);
});

