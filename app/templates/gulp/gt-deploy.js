/* jshint node:true */
'use strict';

/**
 * Require
 * Get the libs for this file.
 */
var gulp = require('gulp');
var del = require('del');
var replace = require('gulp-replace');
var $ = require('gulp-load-plugins')();



/**
 * clean
 *
 * Delete the .tmp and dist folders.
 */
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));


/**
 * build
 * 
 * Deploys the app folder into the dist folder running various
 * tasks to create a production ready project.
 *
 * Deps: wiredepBuild, jshint
 */
gulp.task('build', ['wiredepBuild', 'jshint', 'images', 'fonts'], function() {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});


gulp.task('replace', function() {

    return gulp.src(['dist/header.php', 'dist/footer.php'])
        .pipe(gulp.dest('dist'));

});


/**
 * wiredepBuild
 * 
 * Inject bower components without dev.
 */
gulp.task('wiredepBuild', ['moveFiles'], function() {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            ignorePath: /^(\/|\.+(?!\/[^\.]))+\.+/
        }))
        .pipe(gulp.dest('app/styles'));

    // return gulp.src(['app/header.php', 'app/footer.php'])
    //     .pipe(wiredep({
    //         ignorePath: /^(\/|\.+(?!\/[^\.]))+\.+/
    //     }))
    //     .pipe(gulp.dest('dist'));
});


/**
 * images
 * 
 * Runs minification and caching on the images. Moves the images to
 * the dist/images folder.
 */
gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});


/**
 * moveFiles
 * 
 * Move files to the dist folder, whilst ignoring a few.
 *
 * Deps: html
 */
gulp.task('moveFiles', ['moveCssFiles'], function(){
    // // Move wordpress partials to the correct folder
    // gulp.src([
    //     'dist/header.php',
    //     'dist/footer.php'
    // ])
    // .pipe(gulp.dest('dist'));

    // Move inc folder
    gulp.src([
        'app/inc/*.php'
    ])
    .pipe(gulp.dest('dist/inc'));

    // // Move inc folder
    // gulp.src([
    //     'app/scripts/**/*'
    // ])
    // .pipe($.if('*.js', $.uglify()))
    // .pipe(gulp.dest('dist/scripts'));

    // move acf files
    gulp.src([
        'app/acf/**',
    ])
    .pipe(gulp.dest('dist/acf/'));

    // move templates files
    gulp.src([
        'app/templates/**',
    ])
    .pipe(gulp.dest('dist/templates/'));

    gulp.src([
        //all files
        'app/*.*',

        //but not these
        '!app/header.php', '!app/footer.php', '!app/*.html'
    ], { dot: true })
    .pipe(gulp.dest('dist'));
});


// Move perch partials to the correct folder
gulp.task('moveCssFiles', ['html'], function(){
    return gulp.src('app/styles/*.css')
    .pipe($.csso())
    .pipe(gulp.dest('dist/styles'));
});


gulp.task('fonts', function() {
    return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'));
});


/**
 * html
 *
 * Deps: pixrem
 */
gulp.task('html', ['pixrem'], function() {

    var filesToProcess = ['app/header.php', 'app/footer.php'];
    var removeCode = require('gulp-remove-code');
    var wiredep = require('wiredep').stream;

    return gulp.src(filesToProcess)
        .pipe(wiredep({
            ignorePath: /^(\/|\.+(?!\/[^\.]))+\.+/
        }))
        .pipe($.useref({
            transformPath: function(filePath) {
                console.log(filePath);
                return filePath.replace("<?php echo get_template_directory_uri(); ?>",'')
            }
        }))
        .pipe(replace('href="/styles', 'href="<?php echo get_stylesheet_directory_uri(); ?>/styles'))
        .pipe(replace('src="/scripts', 'src="<?php echo get_stylesheet_directory_uri(); ?>/scripts'))
        .pipe(removeCode({ production: true }))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('dist'));
});




