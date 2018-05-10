var gulp = require('gulp')
var pug = require('gulp-pug');
var inlineCss = require('gulp-inline-css');
var gls = require('gulp-live-server');

gulp.task('views', function buildHTML() {
  return gulp.src('emails/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'))
});
 
gulp.task('inline', function() {
  return gulp.src('build/*.html')
      .pipe(inlineCss())
      .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch(['emails/*.pug', 'layouts/*.pug', 'partials/*.pug'], ['views']);
  gulp.watch('build/*.html', ['inline']);
});

gulp.task('serve', function() {
  var server = gls.static(['build']);
  server.start();

  gulp.watch(['build/**/*.html'], function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('default', ['views', 'inline', 'watch', 'serve'])
