var controllers = require('./controllers');
var worker = require('../lib/controllers/worker');
var crowdflower = require('../lib/controllers/crowdflower');

module.exports = function (app) {
    app.get('/', controllers.index);

    // Worker Routes
    app.get('/workers', worker.list, function (req, res) {
        console.log('GET');
        res.send(req.context.workers);
    });

    app.post('/workers', worker.get_or_create, function (req, res) {
        res.json(req.context);

    });

    app.get('/crowdflower', crowdflower.webhook);
};
