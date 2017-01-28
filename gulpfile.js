var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var order = require('gulp-order');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// Constants

var prodDir = 'dist/prod/';
var devDir = 'dist/dev/';
var vendorDir = 'src/public/vendor/';

var vendorDependencies = [
    'jquery/dist/jquery.js',
    'angular/angular.js',
    'angular-resource/angular-resource.js',
    'angular-route/angular-route.js',
    'foundation-sites/js/foundation.core.js',
    'foundation-sites/js/foundation.util.mediaQuery.js',
    'foundation-sites/js/foundation.util.motion.js',
    'foundation-sites/js/foundation.util.triggers.js',
    'foundation-sites/js/foundation.util.keyboard.js',
    'foundation-sites/js/foundation.offcanvas.js'
    ];

var vendorSassPaths = [
    vendorDir + 'foundation-sites/scss/',
    vendorDir + 'font-awesome/scss/'
    ];

// Clean Tasks

gulp.task('clean', function () {
    return del(['dist/']);
});

/**
 * Watch Tasks
 */

gulp.task('watch-sass', function () {
    gulp.watch('src/public/**/*.scss', ['prod-sass']);
});

gulp.task('watch-js', function () {
    gulp.watch('src/public/**/*.js', ['prod-js', 'prod-admin-js']);
});

gulp.task('browser-sync', ['prod-sass', 'prod-client'], function () {
    browserSync.init({
        port: 3001,
        proxy: 'localhost:3000',
        open: false,
    });

    gulp.watch('src/public/**/*.scss', ['prod-sass']);
    gulp.watch('src/**/*.ejs', ['prod-server']).on('change', browserSync.reload);
    gulp.watch('src/public/**/*.html').on('change', browserSync.reload);
});

/**
 * Distribution Tasks
 */

// Process/move all client-side js
gulp.task('prod-admin-js', function () {
    return gulp.src([
            'src/public/admin/**/*module.js',
            'src/public/shared_services/**/*module.js',
            'src/public/admin/**/*.js',
            'src/public/shared_services/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('admin.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(prodDir + 'public/js/'));
});

gulp.task('prod-js', function () {
    return gulp.src([
            'src/public/**/*module.js',
            'src/public/**/*.js',
            'src/public/app.js',
            '!src/public/vendor/**/*.js',
            '!src/public/admin/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(prodDir + 'public/js/'));
});

// Process/move sass to css
gulp.task('prod-sass', function () {
    return gulp.src('src/public/scss/all.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: vendorSassPaths,
            //outputStyle: 'compressed',
            outFile: 'all.css'})
            .on('error', sass.logError))
        .pipe(sourcemaps.write({includeContent: false}))        // Needed for the sourcemaps to turn out correctly -_-
        .pipe(sourcemaps.init({loadMaps: true}))                // ^
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(prodDir + 'public/css/'))
        .pipe(browserSync.stream());
});

// Process/move all vendor code
gulp.task('prod-vendor', function () {
    var vendorList = vendorDependencies.map(function (curr, i, arr) {
        return vendorDir + curr;
    });

    return gulp.src(vendorList)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(prodDir + 'public/js/'));
});

// Process/move all non-vendor client side files
gulp.task('prod-client', function () {
    return gulp.src([
        'src/public/**/*',
        '!src/public/**/*.js',
        '!src/public/**/*.scss',
        '!src/public/vendor/**/*'])
        .pipe(plumber())
        .pipe(gulp.dest(prodDir + 'public/'));
});

// Process/move all server files.
gulp.task('prod-server', function () {
    return gulp.src([
        'src/**/*',
        '!src/public/**/*'])
        .pipe(plumber())
        .pipe(gulp.dest(prodDir));
});

/**
 * Task Shortcuts
 */

gulp.task('prod', ['prod-js', 'prod-sass', 'prod-server', 'prod-client', 'prod-vendor', 'prod-admin-js']);

gulp.task('watch', ['watch-sass', 'watch-js']);

gulp.task('default', ['prod']);
