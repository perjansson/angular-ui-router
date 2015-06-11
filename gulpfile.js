var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
	nodemon = require('nodemon');

gulp.task('lint', function() { 
    return gulp.src('public/js/**/*.js')
	    .pipe(jshint()) 
	    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['public/**/*']).on('change', livereload.changed);
});

gulp.task('start', function () {
	nodemon({
		script: 'server.js'
	});
});

gulp.task('default', ['watch', 'start']);