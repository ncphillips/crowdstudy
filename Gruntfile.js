'use strict';

module.exports = function (grunt) {
  // Configure Grunt Tasks
  var grunt_config = {
    // Define the `package.json` file
    pgk: grunt.file.readJSON('package.json'),

    // Runs the application, and watches the `server.js` file and all experiment files.
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,html',
          watch: ['server.js', 'experiments/*/*.js', 'experiments/*/views/**/*.jsx']
        }

      }

    },

    react: {
      dynamic_mappings: {
        files: [{
          expand: true,
          src: [
            'experiments/**/public/scripts/*.jsx',
            'experiments/**/public/scripts/**/*.jsx',
            'public/scripts/*.jsx',
            'public/scripts/**/*.jsx'
          ],
          dest: 'public/scripts/build', // I can't get this to work with a ../build pattern.
          ext: '.js'

        }]
      }
    },
    jslint: {
      all: {
        src: [
          './experiments/**/*.js',
          './experiments/**/public/scripts/*.js',
          './experiments/**/public/scripts/**/*.js',
          './public/scripts/src/*.js',
          './public/scripts/src/**/*.js'
        ]
      }
    },
    browserify: {
      dist: {
        files: {
          // Generated Below.
        }
      },
      options: {
        alias: {
          // Dispatcher
          'CrowdDispatcher': './public/scripts/build/public/scripts/src/CrowdDispatcher.js',

          // Stores
          'WorkerStore': './public/scripts/build/public/scripts/src/Worker/WorkerStore.js',
          'ExperimentStore': './public/scripts/build/public/scripts/src/Experiment/ExperimentStore.js',

          // Actions
          'WorkerActions': './public/scripts/build/public/scripts/src/Worker/WorkerActions.js',
          'ExperimentActions': './public/scripts/build/public/scripts/src/Experiment/ExperimentActions.js',

          // Components
          'CrowdExperiment': './public/scripts/build/public/scripts/src/CrowdExperiment.js',
          'ConsentForm': './public/scripts/build/public/scripts/src/ConsentForm.js',
          'CodeDisplay': './public/scripts/build/public/scripts/src/CodeDisplay.js',
          'WorkerRegistrationForm': './public/scripts/build/public/scripts/src/WorkerRegistrationForm.js',
          'Ethics': './public/scripts/build/public/scripts/src/Ethics.js',
          'DemographicSurvey': './public/scripts/build/public/scripts/src/DemographicSurvey.js',
          'BarCharts': './public/scripts/build/public/scripts/src/d3components/BarCharts.js'
        }
      }
    },
    mochaTest: {
      test: {
        src: ["experiments/**/tests/*/js"]
      }
    },
    // Runes nodemon and watch concurrently, and makes sure to display all logs.
    concurrent: {
      default: ['nodemon', 'watch', 'react', 'jslint', 'browserify'],
      options: {
        logConcurrentOutput: true
      }
    }
  };

  ///////////////////////////////////////
  // Browserify Experiment Javascripts //
  ///////////////////////////////////////
  var glob = require('glob');
  var experiments = glob.sync('experiments/**/app.js');
  experiments.forEach(function (path, n) {
    var path_a= path.split('/');
    var name = path_a[path_a.length-2];
    var scripts = ['./public/scripts/build/experiments', name,'public/scripts/*.js'].join('/');
    var subscripts = ['./public/scripts/build/experiments', name,'public/scripts/**/*.js'].join('/');

    grunt_config.browserify.dist.files['public/scripts/build/' + name + '.js'] = [scripts, subscripts];
  });

  grunt.initConfig(grunt_config);

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-jslint');

  grunt.option('force', true);

  // When running `grunt`, the concurrent:default task is run.
  grunt.registerTask('default', ['concurrent:default']);
  grunt.registerTask('test', ['env:test', 'mochaTest']);

};
