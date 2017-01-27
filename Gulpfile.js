var gulp = require('gulp');
//var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var util = require('gulp-util');
//var uglify = require('gulp-uglify'); //only javascript minification
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
//var browserSync = require('browser-sync');
//var copy = require('copy-files');
//var copydir = require('copy-dir');
//var livereload = require("livereload");

var jsbundlerCount = 1;
var cssbundlerCount = 1;
var jsBundleDest = './public/assets/js/';
var cssBundleDest = './public/assets/css/';

function bundle(bundler){
	return bundler
		.bundle()
		.on('error', function(err){
			util.log(err);
		})
		.pipe(source('app.js'))
    .pipe(rename('app.js'))
		.pipe(gulp.dest(jsBundleDest));
}

function cssbundle(){
    gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(rename('app.css'))
      .pipe(gulp.dest(cssBundleDest));
}

gulp.task('watch-js', function() {
  var watcher = watchify(browserify('./src/js/'), watchify.args);
  bundle(watcher);
  watcher.on('update', function(){
  	console.log('--> Js bundling: ' + jsbundlerCount);
  	bundle(watcher);
  	jsbundlerCount++;
  })
  watcher.on('log', util.log);
});

gulp.task('styles', function () {
  console.log('--> Sass bundling: ' + cssbundlerCount);
  cssbundlerCount++;
  cssbundle();
});

gulp.task('watch-sass', function () {
  return gulp.watch('./src/scss/**/*.scss', ['styles']);
});

gulp.task('minify-scripts', function() {  
    return gulp.src(jsBundleDest + 'app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest(jsBundleDest));
});

gulp.task('minify-css', function() {
    return gulp.src(cssBundleDest + 'app.css')
      .pipe(uglify())
      .pipe(rename('app.min.css'))
      .pipe(gulp.dest(cssBundleDest));
});

gulp.task('watch', ['watch-js', 'watch-sass']);
gulp.task('minify', ['minify-scripts', 'minify-css']);
gulp.task('default', ['watch']);