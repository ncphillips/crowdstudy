'use strict';
var controllers = require('./controllers');
var NUM_IMAGES = 2;

/**
 * Adds new routes to the application passed in.
 * @param app
 */
module.exports = function (app) {

    app.get('/', controllers.renderApp);

    app.post('/story', function (req, res) {
        var A = require('../../alchemyapi');
        var alchemy = new A();

        var img = parseInt(req.body.img);

        // @todo Generate Metrics
        var response = {
            metrics: {
                //alchemy: results,
                time: { },
                characters: {
                    worker: req.body.story_text.length,
                    average: 100
                },
                words: {}
            }
        };

        // @todo Save results

        // Send response.
        if (img < NUM_IMAGES) {
            // Next Image
            response.img = img + 1;
            res.json(response);

        }
        else {
            // Generate code.
            auth.generate_confirmation_code(req, res, function () {
                response.code = req.confirmation_code;
                res.json(response);
            })
        }
    });
};


