var gulp = require('gulp')
var pug = require('gulp-pug');
var inlineCss = require('gulp-inline-css');

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


gulp.task('default', ['views', 'inline'])
