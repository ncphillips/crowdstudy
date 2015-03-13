/**
 * @module Config
 * @description
 * This module contains a single config object.
 */
var config = {
    title: 'CrowdStudy',
    email: 'ncphillips@upei.ca',
    port: 3000,
    _db: {
        full: 'mongodb://127.0.0.1:27017/crowdstudy',
        url: '127.0.0.1',
        port: '27017',
        name: 'crowdstudy'
    },
    /**
     * Returns the URL for the MongoDB instance.
     *
     * @returns {string}
     */
    get db () {
        return 'mongodb://' + config._db.url + ':' + config._db.port + '/' + config._db.name;
    }
};

module.exports = config;
