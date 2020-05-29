
var jsbundlerCount = 1;
var cssbundlerCount = 1;
var jsBundleDest = './public/assets/js/';
var cssBundleDest = './public/assets/css/';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
//const { watch } = require('gulp');
 
function cssbundle(){
    gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(rename('app.css'))
      .pipe(gulp.dest(cssBundleDest));
}

gulp.task('styles', function () {
  console.log('--> Sass bundling: ' + cssbundlerCount);
  cssbundlerCount++;
  cssbundle();
});

gulp.task('sass', function() {
  cssbundlerCount++;
  console.log('--> Sass bundling');
  return gulp.src('./src/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(gulp.dest(cssBundleDest));
})

gulp.task('watch', function(){
  gulp.watch('./src/scss/**/*.scss', gulp.series(['sass'])); 
  // Other watchers
})
