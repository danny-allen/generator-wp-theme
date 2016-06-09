/* jshint node:true */
'use strict';
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var requireDir = require('require-dir');
var $ = require('gulp-load-plugins')();

/**
 * Get other gulp files
 * 
 * Well, we don't want everything in here!
 */
requireDir('./gulp');



/**
 * default
 *
 * Runs build
 *
 * Deps: clean
 */
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});


/**
 * watch
 * 
 * Listens for changes to various files and compiles SASS, injects bower
 * components.
 *
 * Deps: connect
 */
gulp.task('watch', ['connect'], function() {
    $.livereload.listen();

    // watch for changes
    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', $.livereload.changed);

    gulp.watch('app/styles/**/*.scss', ['pixrem']);
    gulp.watch('bower.json', ['wiredep']);
});


gulp.task('connect', ['pixrem'], function() {
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var client = require('connect')()
        .use(require('connect-livereload')({
            port: 35729
        }))
        .use(serveStatic('.tmp'))
        .use(serveStatic('app'))
        // paths to bower_components should be relative to the current file
        // e.g. in client/index.html you should use ../bower_components
        .use('/bower_components', serveStatic('bower_components'))
        .use(serveIndex('app'));

    require('http').createServer(client)
        .listen(9000)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:9000');
        });
});