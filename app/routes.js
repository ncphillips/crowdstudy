var controllers = require('./controllers');
var worker = require('../lib/controllers/worker');
var crowdflower = require('../lib/controllers/crowdflower');

module.exports = function (app) {
    app.get('/', controllers.index);

    // Worker Routes
    app.get('/workers', worker.list, function (req, res) {
        res.send(req.context.workers);
    });

    app.get('/crowdflower', crowdflower.webhook);
};
