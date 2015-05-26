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
          dest: '.', // I can't get this to work with a ../build pattern.
          ext: '.js'

        }]
      }

    },
    browserify: {
      dist: {
        files: {
          'public/scripts/build/CrowdStudy.js': [
            './public/scripts/src/*.js',
          ]
        }
      },
      options: {
        alias: {
          'CrowdExperiment': './public/scripts/src/CrowdExperiment.js',
          'ConsentForm': './public/scripts/src/ConsentForm.js',
          'CodeDisplay': './public/scripts/src/CodeDisplay.js',
          'Worker': './public/scripts/src/Worker.js',
          'Ethics': './public/scripts/src/Ethics.js',
          'BarCharts': './public/scripts/src/d3components/BarCharts.js'
        }
      }
    },
    // Runes nodemon and watch concurrently, and makes sure to display all logs.
    concurrent: {
      default: ['nodemon', 'watch', 'react', 'browserify'],
      options: {
        logConcurrentOutput: true
      }
    }
  };

  var glob = require('glob');
  var experiments = glob.sync('experiments/**/app.js');
  experiments.forEach(function (path, n) {
    var path_a= path.split('/');
    var name = path_a[path_a.length-2];
    var scripts = ['.', 'experiments', name,'public/scripts/*.js'].join('/');
    var subscripts = ['.','experiments', name,'public/scripts/**/*.js'].join('/');

    grunt_config.browserify.dist.files['public/scripts/build/experiments/'+name+'.js'] = [scripts, subscripts];
  });

  grunt.initConfig(grunt_config);

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-react');

  grunt.option('force', true);

  // When running `grunt`, the concurrent:default task is run.
  grunt.registerTask('default', ['concurrent:default'])

};
