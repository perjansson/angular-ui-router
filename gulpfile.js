var gulp = require('gulp'),
  args = require('yargs').argv,
  nodemon = require('nodemon'),
  config = require('./gulp.config')(),
  $ = require('gulp-load-plugins')({
    lazy: true
  }),

  webdriver_standalone = $.protractor.webdriver_standalone,
  webdriver_update = $.protractor.webdriver_update;

gulp.task('vet', function() {
  return gulp.src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('template_cache', function() {
  return gulp.src('public/partials/**/*.html')
    .pipe($.minifyHtml({
      quotes: true
    }))
    .pipe($.angularTemplatecache('templates.js', {
      module: 'personApp',
      root: 'partials/',
      standAlone: false
    }))
    .pipe(gulp.dest('public/js/templates/'));
});

gulp.task('watch', function() {
  $.livereload.listen();
  gulp.watch(['public/**/*']).on('change', $.livereload.changed);
});

gulp.task('start', function() {
  nodemon({
    script: 'server.js'
  });
});

gulp.task('wiredep', function() {
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;

  return gulp.src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.client));
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
