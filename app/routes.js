var controllers = require('./controllers');
var worker = require('../lib/controllers/worker');
var crowdflower = require('../lib/controllers/crowdflower');

module.exports = function (app) {
    app.get('/', controllers.index);

    // Worker Routes
    app.get('/worker', worker.list, function (req, res) {
        console.log('GET');
        res.send(req.context.workers);
    });

    app.post('/worker', worker.get_or_create, worker.register_for_experiment, function (req, res) {
        res.json(req.context.worker);

    });

    app.get('/crowdflower', crowdflower.webhook);
};
