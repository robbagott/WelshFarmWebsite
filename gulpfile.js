var del = require('del');
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var vendor = require('gulp-concat-vendor');

// Clean Tasks

gulp.task('clean-prod', function () {
	return del(['dist/prod']);
});

gulp.task('clean-dev', function () {
	return del(['dist/dev']);
});

gulp.task('clean', ['clean-prod', 'clean-dev']);

// Distribution Tasks

gulp.task('prod-js', function () {
	return gulp.src(['src/public/**/*.js'])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('dist/prod/public/'));
});

gulp.task('prod-scss', function () {
	return gulp.src('src/**/*.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/prod/'));
});

gulp.task('prod-public-lib', function () {
	return gulp.src('src/public/lib')
		.pipe(plumber())
		.pipe(gulp.dest('dist/prod/public/lib/'));
});

gulp.task('prod-public', function () {
	return gulp.src([
		'src/public/**/*',
		'!src/public/**/*.js',
		'!src/public/**/*.scss'])
		.pipe(plumber())
		.pipe(gulp.dest('dist/prod/public'));
});

gulp.task('prod-server', function () {
	return gulp.src([
		'src/**/*.ejs',
		'src/**/*.js',
		'!src/public/**/*'])
		.pipe(plumber())
		.pipe(gulp.dest('dist/prod/'));
});

// Development Tasks

gulp.task('dev-js', function () {
	return gulp.src('src/public/**/*.js')
		.pipe(plumber())
		.pipe(gulp.dest('dist/dev/public/'));
});

gulp.task('dev-scss', function () {
	return gulp.src('src/**/*.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/dev/'));
});

gulp.task('dev-public-lib', function () {
	return gulp.src('src/public/lib')
		.pipe(plumber())
		.pipe(gulp.dest('dist/dev/public/lib/'));
});

gulp.task('dev-public', function () {
	return gulp.src([
		'src/public/**/*',
		'!src/public/**/*.js',
		'!src/public/**/*.scss'])
		.pipe(plumber())
		.pipe(gulp.dest('dist/dev/public'));
});

gulp.task('dev-server', function () {
	return gulp.src([
		'src/**/*.ejs',
		'src/**/*.js',
		'!src/public/**/*'])
		.pipe(plumber())
		.pipe(gulp.dest('dist/dev/'));
});

// Task Shortcuts

gulp.task('prod', ['prod-js', 'prod-scss', 'prod-server', 'prod-public', 'prod-public-lib', 'prod-vendor']);

gulp.task('dev', ['dev-js', 'dev-scss', 'dev-server', 'dev-public', 'dev-public-lib']);

gulp.task('default', ['prod', 'dev']);
