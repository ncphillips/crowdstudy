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
 * Renders teh page which displays the code generated for the worker who completed the Survey.
 *
 * @param req
 * @param res
 */
exports.showCode = function (req, res){
    req.context.code = req.confirmation_code;
    res.render('code_page', req.context);
};






