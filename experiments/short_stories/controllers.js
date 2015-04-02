'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Renders the StoryTime app.
 *
 * @param req
 * @param res
 */
exports.renderApp = function (req, res) {
    res.render('index', req.context);
};


/**
 * Sets the context for the Short Stories app from the URL/Form data.
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.setContext = function(req, res, next) {
    var context = {
        errors: {}
    };

    if (req.query.platform === 'crowdflower') {
        context.platform = 'crowdflower';
    }
    else if (req.query.platform === 'mturk' && (req.query.hitId || req.body.hitId)) {
        context.platform = 'mturk';

        // This is camelcase because mTurk does camel case.
        // The hitId is originally passed in by the URL, but it's added to the form as
        // an extra hidden field. This is just to try and catch it if the URL query
        // gets removed.
        context.hitId = req.query.hitId || req.body.hitId;
    }

    else {
        return res.render('error');
    }

    req.context = context;
    return next();
};



/**
 * Renders teh page which displays the code generated for the worker who completed the Survey.
 *
 * @param req
 * @param res
 */
exports.showCode = function (req, res){
    req.context.code = req.confirmation_code;
    res.render('code_page', req.context);
};






