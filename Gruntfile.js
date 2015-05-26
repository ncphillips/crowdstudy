module.exports = function (grunt) {
    // Configure Grunt Tasks
    grunt.initConfig({
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
                'public/scripts/*.js',
                'public/scripts/**/*.js'
              ]
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
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-react');

    grunt.option('force', true);

    // When running `grunt`, the concurrent:default task is run.
    grunt.registerTask('default', ['concurrent:default'])
};
