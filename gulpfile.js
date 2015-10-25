var gulp = require('gulp'),
  notify = require('gulp-notify'),
  growl = require('gulp-notify-growl'),
  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  templateCache = require('gulp-angular-templatecache'),
  minifyHTML = require('gulp-minify-html'),
  livereload = require('gulp-livereload'),
  nodemon = require('nodemon'),
  protractor = require("gulp-protractor").protractor,
  webdriver_standalone = require("gulp-protractor").webdriver_standalone,
  webdriver_update = require('gulp-protractor').webdriver_update;

gulp.task('vet', function() {
  return gulp.src([
      './public/js/**/*.js',
      './*.js'
    ])
    .pipe(jscs())
    //.pipe(jshint())
    //.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('template_cache', function() {
  return gulp.src('public/partials/**/*.html')
    .pipe(minifyHTML({
      quotes: true
    }))
    .pipe(templateCache('templates.js', {
      module: 'personApp',
      root: 'partials/',
      standAlone: false
    }))
    .pipe(gulp.dest('public/js/templates/'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['public/**/*']).on('change', livereload.changed);
});

gulp.task('start', function() {
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
