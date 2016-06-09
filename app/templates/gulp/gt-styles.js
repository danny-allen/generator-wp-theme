/* jshint node:true */
'use strict';

/**
 * Require
 * Get the libs for this file.
 */
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var $ = require('gulp-load-plugins')();



/**
 * injectScss
 * 
 * Find the SASS modules and inject the paths into the main.scss file.
 */
gulp.task('injectScss', function() {

    var target = gulp.src('app/styles/main.scss');
    var sources = gulp.src(['app/styles/modules/**/*.scss'], {read: false});

    return target.pipe($.inject(sources, {
        starttag: '// inject:scss',
        endtag: '// endinject',
        relative: true,
        transform: function (filepath) {
            // Return path without file ext
            return '\'' + filepath.slice(0, -5) + '\',';
        }
    }))
    .pipe(gulp.dest('app/styles'));
});


/**
 * styles
 * 
 * Compile SASS and output to .tmp folder.
 *
 * Deps: injectScss
 */
gulp.task('styles', ['injectScss'], function() {
    return sass('app/styles/main.scss', { style: 'expanded' })
        .pipe($.autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('.tmp/styles/temp'));
});


/**
 * pixrem
 * 
 * Generate pixel fallbacks for rem units on our stylesheets.
 *
 * Deps: styles
 */
gulp.task('pixrem', ['styles'], function() {
    return gulp.src('.tmp/styles/temp/main.css')
        .pipe($.pixrem('16px'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(gulp.dest('app/styles'));
});