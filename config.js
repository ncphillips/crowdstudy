var fs = require('fs');

/**
 * @module Config
 * @description
 * This module contains a single config object.
 */
var config = {
    title: 'CrowdStudy',
    email: 'ncphillips@upei.ca',

    server: {
        port: 3000,
        use_https: false,

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
            return 'mongodb://' + config.server._db.url + ':' + config.server._db.port + '/' + config.server._db.name;
        }
    },

    mturk: {

    },

    crowdflower: {
        api_key: require('./cf_api_key')
    }
};

if (config.server.use_https) {
    config.server.https_options = {
        key: fs.readFileSync(config.server.key_path),
        cert: fs.readFileSync(config.server.cert_path)
    };
}


module.exports = config;
