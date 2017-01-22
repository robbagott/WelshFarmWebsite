var del = require('del');
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// Clean Tasks

gulp.task('clean-dist', function () {
	return del(['dist']);
});

gulp.task('clean-devel', function () {
	return del(['devel']);
});

gulp.task('clean', ['clean-dist', 'clean-devel']);

// Distribution Tasks

gulp.task('dist-js', function () {
	return gulp.src('src/**/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('dist-scss', function () {
	return gulp.src('src/**/*.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('dist-other', function () {
	return gulp.src([
		'src/**/*.ejs',
		'src/**/*.html',
		'src/public/lib',
		'src/**/media/**.*'])
		.pipe(plumber())
		.pipe(gulp.dest('dist'));
});

// Development Tasks

gulp.task('devel-js', function () {
	return gulp.src('src/**/*.js')
		.pipe(plumber())
		.pipe(gulp.dest('devel'));
});

gulp.task('devel-scss', function () {
	return gulp.src('src/**/*.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('devel'));
});

gulp.task('devel-other', function () {
	return gulp.src([
		'src/**/*.ejs',
		'src/**/*.html',
		'src/public/lib',
		'src/**/media/**.*'])
		.pipe(plumber())
		.pipe(gulp.dest('devel'));
});

// Task Shortcuts

gulp.task('dist', ['dist-js', 'dist-scss', 'dist-other']);

gulp.task('devel', ['devel-js', 'devel-scss', 'devel-other']);

gulp.task('default', ['dist', 'devel']);
