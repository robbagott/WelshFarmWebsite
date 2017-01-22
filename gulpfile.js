var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var uglify = require('gulp-uglify');

gulp.task('clean', function () {
	return del(['dist']);
});

gulp.task('dist-js', function () {
	return gulp.src('src/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('dist-css', function () {
	return gulp.src('src/**/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('dist-other', function () {
	return gulp.src([
		'src/**/*.ejs',
		'src/**/*.html',
		'src/public/lib'])
		.pipe(gulp.dest('dist'));

});

gulp.task('dist', ['dist-js', 'dist-css', 'dist-other']);

gulp.task('default', ['dist']);