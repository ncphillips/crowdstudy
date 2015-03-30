'use strict';
var controllers = require('./controllers');

/**
 * Adds new routes to the application passed in.
 * @param app
 */
module.exports = function (app) {

    app.get('/', controllers.setContext, controllers.getForm);

    app.post('/', controllers.setContext, controllers.validateForm, controllers.saveWork, controllers.showCode);

    app.post('/webhook', controllers.webhook);


    app.post('/submitStory', function (req, res) {
        var A = require('../../alchemyapi');
        var alchemy = new A();

        if (req.body.story_num >= 0 ){
            alchemy.sentiment("text", req.body.story_text, {}, function (results) {
                res.json({
                    story_num: 0,
                    img_url: 'crowdflower_worker_id.png',
                    metrics: {
                        character_count: {
                            average: 100,
                            worker: req.body.story_text.length
                        },
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


