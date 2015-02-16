'use strict';
var app = require('express')();
var body_parser = require('body-parser');
var debug = require('express-debug');
var glob = require('glob');
var jsx_engine = require('express-react-views').createEngine({ jsx: { harmony: true } }); // Harmony allows for ES6.
var log = require('bunyan').createLogger({name: 'CrowdStudy'});

// Configuration
/**
 * @todo Put config in a separate file.
 */
var config = {
    title: 'CrowdStudy',
    email: 'ncphillips@upei.ca',
    port: 3000,
    _db: {
        full: 'mongodb://127.0.0.1:27017/crowdstudy',
        url: '127.0.0.1',
        port: '27017',
        name: 'crowdstudy'
    },
    get db () {
        return 'mongodb://' + config._db.url + ':' + config._db.port + '/' + config._db.name;
    }
};

// Locals
app.locals.title = config.title;
app.locals.email = config.email;
app.locals.log = log;

// Body Parsers
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json);

// View Engine - React
app.set('view engine', 'jsx');
app.engine('jsx', jsx_engine);

// Database - MongoDb
var MongoClient = require('mongodb').MongoClient;
app.use(function (req, res, next) {
    MongoClient.connect(config.db, function (err, db) {
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

// Debugging
debug(app);

// Start Server
var server = app.listen(config.port, function() {
    var host = server.address().address;
    var port = server.address().port;

    log.info('Server Listening at http://%s:%s', host, port);
});
