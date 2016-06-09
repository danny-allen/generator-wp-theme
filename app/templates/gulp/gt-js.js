/* jshint node:true */
'use strict';

/**
 * Require
 * Get the libs for this file.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


/**
 * jshint
 *
 * Looks at the specofoed path and runs jshint on the files.
 * Styles the output and will show if failed.
 */
gulp.task('jshint', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});