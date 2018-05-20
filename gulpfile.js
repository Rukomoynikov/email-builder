var gulp = require('gulp')
var pug = require('gulp-pug');
var inlineCss = require('gulp-inline-css');
var gls = require('gulp-live-server');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");

var onError = function (err) {
  notify({
       title: 'Gulp Task Error',
       message: 'Check the console.'
   }).write(err);

   console.log(err.toString());
   
   this.emit('end');
}

gulp.task('views', function buildHTML() {
  return gulp.src('emails/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .on('error', onError)
  .pipe(gulp.dest('build'))
});
 
gulp.task('inline', function() {
  return gulp.src('build/*.html')
      .pipe(inlineCss())
      .on('error', onError)
      .pipe(gulp.dest('build/'))
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
