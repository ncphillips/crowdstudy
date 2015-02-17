'use strict';
var express = require('express')
var app = express();
var body_parser = require('body-parser');
var debug = require('express-debug');
var glob = require('glob');
var jsx_engine = require('express-react-views').createEngine({ jsx: { harmony: true } }); // Harmony allows for ES6.

// A global `log` object using a `bunyan` logger.
global.log = require('bunyan').createLogger({name: 'CrowdStudy'});

/**
 * @todo Put config in a separate file.
 */
// Configuration
var config = {
    // Application Title
    title: 'CrowdStudy',
    // Admin Email
    email: 'ncphillips@upei.ca',
    // Default Port
    port: 3000,
    // MongoDB Connection Info
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

// Application variables
app.locals.title = config.title;
app.locals.email = config.email;

// These middleware functions parse the HTTP request body for json or urlencoded information.
app.use(body_parser.urlencoded());
app.use(body_parser.json());

// Static Files
app.use(express.static('public'));

// React.js is used as the view engine.
app.set('view engine', 'jsx');
app.engine('jsx', jsx_engine);

// MongoDb is used as the database.
// A connection to Mongo is created every time there is a new request.
// An object representing that connection is assigned to `req.db` for
// the controllers to use.
var MongoClient = require('mongodb').MongoClient;
app.use(function (req, res, next) {
    MongoClient.connect(config.db, function (err, db) {
        if (err) {
            log.error(err);
            return next(err);
        }

        req.db = db;
        next();
    });
});

// Main Routes
app.set('views', __dirname+'/app/views');
require('./app/routes')(app);

// Register Experiments
log.info('Lookign for Experiments');
var experiments = glob.sync('experiments/**/app.js');

global.experiments = [];
experiments.forEach(function (path, n) {
    var path_a= path.split('/');
    var name = path_a[path_a.length-2];
    var experiment = require('./' + path);

    global.experiments.push(name);
    app.use('/' + name, experiment);

    log.info('\t Experiment %s - %s', n+1, name);
});

// Debugging
debug(app);

// Start the Server.
var server = app.listen(config.port, function() {
    var host = server.address().address;
    var port = server.address().port;

    log.info('Server Listening at http://%s:%s', host, port);
});
