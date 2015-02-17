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
                    watch: ['server.js', 'experiments/**/*.js', 'experiments/**/*']
                }

            }

        },
        // Runes nodemon and watch concurrently, and makes sure to display all logs.
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.option('force', true);

    // When running `grunt`, the concurrent:default task is run.
    grunt.registerTask('default', ['concurrent:default'])
};