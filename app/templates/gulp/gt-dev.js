/* jshint node:true */
'use strict';

/**
 * Require
 * Get the libs for this file.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();



/**
 * wiredep
 * 
 * Inject bower components with dev.
 */
gulp.task('wiredep', function() {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep())
        .pipe(gulp.dest('app/styles'));

    gulp.src(['app/header.php', 'app/footer.php'])
        .pipe(wiredep({
            ignorePath: /^(\/|\.+(?!\/[^\.]))+\.+/,
            devDependencies: true, // default: false
            fileTypes: {
                html: {
                  replace: {
                    js: '<script src="<?php echo get_template_directory_uri(); ?>/{{filePath}}"></script>',
                    css: '<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/{{filePath}}" />'
                  }
                }
            }
        }))
        .pipe(gulp.dest('app'));
});