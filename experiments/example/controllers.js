'use strict';

/**
 * @description
 * An example controller function.
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('index', { name: 'John'});
};
