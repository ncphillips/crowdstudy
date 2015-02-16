var log = null;
var express = require('express');
var app = express();

app.on('mount', function childLoggerFrom(parent) {
    log = parent.locals.log.child({experiment: 'Experiment 1'});
});

app.get('/', function (req, res) {
    res.send('Hello Experiment 1');
});


module.exports = app;