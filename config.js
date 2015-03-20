var fs = require('fs');

/**
 * @module Config
 * @description
 * This module contains a single config object.
 */
var config = {
    title: 'CrowdStudy',
    email: 'ncphillips@upei.ca',

    port: 8998,

    use_https: true,

    key_path: 'new_server.key',
    cert_path: 'combined.crt',

    _db: {
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

if (config.use_https){
    config.https_options = {
        key: fs.readFileSync(config.key_path),
        cert: fs.readFileSync(config.cert_path)
    };
}


module.exports = config;
