module.exports = function (grunt) {
    grunt.initConfig({
        pgk: grunt.file.readJSON('package.json'),
        watch: {
        },
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


    grunt.registerTask('default', ['concurrent:default'])
};