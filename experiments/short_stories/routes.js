'use strict';
var workers = require('../../lib/controllers/worker'); // Crowd Study Controllers
var controllers = require('./controllers'); // Experiment Controllers

/**
 * Adds new routes to the application passed in.
 * @param app
 */
module.exports = function (app) {

    app.get('/', controllers.renderApp);

    app.get('/worker', workers.get_or_create);


    app.post('/story', function (req, res) {
        var A = require('../../alchemyapi');
        var alchemy = new A();

        if (req.body.story_num >= 0 ){
            alchemy.sentiment("text", req.body.story_text, {}, function (results) {
                res.json({
                    story_num: 0,
                    img_url: 'images/crowdflower_worker_id.png',
                    metrics: {
                        time: {},
                        characters: {},
                        words: {},
                        alchemy: results
                    }
                })
            });
        } else {
            res.json({
                story_num: 0,
                img_url: 'crowdflower_worker_id.png',
                metrics: {}
            })
        }
    });
};


