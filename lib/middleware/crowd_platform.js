/**
 * Creates a `context` object in the `req` and sets the `platform` and `hitId` values for it.
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.parsePlatform = function(req, res, next) {
    if (!req.context) req.context = { };

    /**
     * Should be either 'mturk' or 'crowdflower'.
     *
     * @type {string|*|worker.platform}
     */
    req.context.platform = req.query.platform || '';

    /**
     * Should only be set if the platform is 'mturk'.
     * @type {*|context.hitId|experiment.hitId|string}
     */
    req.context.hitId = req.query.hitId || req.body.hitId || '';


    return next();
};