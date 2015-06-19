var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    nodemon = require('nodemon'),
    protractor = require("gulp-protractor").protractor,
    webdriver_standalone = require("gulp-protractor").webdriver_standalone,
    webdriver_update = require('gulp-protractor').webdriver_update;

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

gulp.task('webdriver_update', webdriver_update);

gulp.task('e2e', ['webdriver_update', 'start'], function(cb) {
    gulp.src(['test/persons-spec.js'])
    .pipe(protractor({
        configFile: 'test/protractor.config.js',
    })).on('error', function(e) {
        console.log(e)
    }).on('end', cb);
});

gulp.task('default', ['watch', 'start']);
