/* jshint node:true */
'use strict';
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var $ = require('gulp-load-plugins')();

/**
 * injectScss
 * 
 * Handles the injection of sass files within main.scss.
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
 * Runs sass with autoprefixer and outputs to the .tmp folder.
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
 */
gulp.task('pixrem', ['styles'], function() {
    return gulp.src('.tmp/styles/temp/main.css')
        .pipe($.pixrem('16px'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(gulp.dest('app/styles'));
});


/**
 * jshint
 *
 * Validates the JS.
 */
gulp.task('jshint', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});


/**
 * html
 *
 * Minifies the HTML, CSS and JS.
 */
gulp.task('html', ['pixrem'], function() {

    var assets = $.useref.assets({
        searchPath: '{.tmp,app}'
    });

    var filesToProcess = 'app/*.php';

    return gulp.src(filesToProcess)
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({
            conditionals: true,
            loose: true
        })))
        .pipe(gulp.dest('dist'));
});


/**
 * moveOtherFiles
 *
 * Handles the moving of the files in the app folder where they do not need extra processing.
 * Also includes sub folders.
 */
gulp.task('moveOtherFiles', ['html'], function(){

    //move inc folder (php only)
    gulp.src([
        'app/inc/*.php'
    ])
    .pipe(gulp.dest('dist/inc'));

    //move inc folder
    gulp.src([
        'app/languages/**/*'
    ])
    .pipe(gulp.dest('dist/languages'));

    //move templates folder
    gulp.src([
        'app/templates/**/*'
    ])
    .pipe(gulp.dest('dist/templates'));

    //move styles folder (css only)
    gulp.src([
        'app/styles/*.css'
    ])
    .pipe(gulp.dest('dist/styles'));

    //move all inside app, except the header and footer (and html files).
    gulp.src([

        //all files
        'app/*.*',

        //but not these
        '!app/header.php', '!app/footer.php', '!app/*.html'

    ], { dot: true })
    .pipe(gulp.dest('dist'));
});


/**
 * images
 *
 * Runs image compression and places the images in the dist folder.
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
 * fonts
 *
 * Optimises the font files and places them in the dist folder.
 */
gulp.task('fonts', function() {
    return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'));
});


/**
 * clean
 *
 * Deletes the dist and .tmp folders.
 */
gulp.task('clean', require('del')
    .bind(null, ['.tmp', 'dist']));


/**
 * wiredep
 * 
 * Inject bower components into header and footer.
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
        }))
        .pipe(gulp.dest('app'));
});


/**
 * wiredepBuild
 *
 * Inject bower components without dev
 */

gulp.task('wiredepBuild', function() {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep())
        .pipe(gulp.dest('app/styles'));

    gulp.src(['app/header.php', 'app/footer.php'])
        .pipe(wiredep({
            ignorePath: /^(\/|\.+(?!\/[^\.]))+\.+/
        }))
        .pipe(gulp.dest('app'));
});


/**
 * watch
 *
 * Watch for changes on css and js files.
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


/**
 * connect
 */
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


/**
 * Build
 *
 * Creates a distribution in the dist folder, depending on many other tasks to produce the final output.
 */
gulp.task('build', ['wiredepBuild', 'jshint', 'moveOtherFiles', 'images', 'fonts'], function() {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});


/**
 * default
 * 
 * Runs the build task after cleaning any existing distribution.
 */
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
