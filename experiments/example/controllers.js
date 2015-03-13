'use strict';

/**
 * @description
 * <p>
 *     An example controller function. It renders the view located at "views/index.jsx".
 * </p>
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    // Render a JSX view and sent it as a response.
    res.render(
        // Specifies the view, which is located at ./views/index.jsx
        'index',
        // Context object.
        { title: 'Example Experiment'}
    );
};
