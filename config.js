/* jslint node: true */
'use strict';

var fs = require('fs');

var _db_name = 'crowdstudy_' + process.env.NODE_ENV;

/**
 * @module Config
 * @description
 * This module contains a single config object.
 */
var config = {
  title: 'Crowd Study',
  email: 'ncphillips@upei.ca',

  // This is an array of subapps to be used by this application.
  INSTALLED_APPS: [
    'crowdstudy_worker',
    'crowdstudy_pointing_task',
    'crowdstudy_writing_task',
    'crowdstudy_whack_a_mole'
  ],

  server: {
    port: 3000,
    use_https: false,

    key_path: 'new_server.key',
    cert_path: 'combined.crt',

    _db: {
      url: '127.0.0.1',
      port: '27017',
      name: _db_name
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
