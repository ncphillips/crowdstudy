'use strict';

var body_parser = require('body-parser');
var debug = require('express-debug');
var glob = require('glob');
var log = require('bunyan').createLogger({name: 'CrowdStudy'});
var app = require('express')();

debug(app);

// Locals
app.locals.title = 'CrowdStudy';
app.locals.email = 'ncphillips@upei.ca';
app.locals.log = log;

// Middleware
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json);

// MongoDB Connection
var db_name = 'crowdstudy';
var MongoClient = require('mongodb').MongoClient;
app.use(function (req, res, next) {
    MongoClient.connect('mongodb://127.0.0.1:27017/' + db_name, function (err, db) {
        if (err) return next(err);
        req.db = db;
        next();
    });
});

// Main Routes
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Register Experiments
log.info('Lookign for Experiments');
var experiments = glob.sync('experiments/**/app.js');

experiments.forEach(function (path, n) {
    var path_a= path.split('/');
    var name = path_a[path_a.length-2];
    var experiment = require('./' + path);

    app.use('/' + name, experiment);

    log.info('\t Experiment %s - %s', n+1, name);
});

// Start Server
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    log.info('Server listening at http://%s:%s', host, port);
});
