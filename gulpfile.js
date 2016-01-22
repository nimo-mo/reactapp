
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var md5 = require('gulp-md5-plus');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

// ============== compile =============
gulp.task('compile-less', function () {
  return gulp.src('src/styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/styles'));
});

gulp.task('webpack', function(callback) {
  // run webpack
  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
      colors: true
    }));
    callback();
  })
});

// ============== build =============
gulp.task('dest-images', function () {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('dest-fonts', function(){
  return gulp.src([
    'src/fonts/*',
  ]).pipe(gulp.dest('dist/fonts'));
});

gulp.task('dest-html', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('compress-js', ['webpack'], function() {
  return gulp.src('src/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compress-css', function() {
  return gulp.src('src/styles/app.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/styles'));
});

// ============== watch =============
// gulp.watch(watchFiles, ['webpack','compile-less'], function(event) {
//   gulp.watch(watchFiles, ['webpack']);
//   console.log(event.path + '^_^')
// });

gulp.task('watch', function() {
  gulp.watch(
    [
      'src/styles/**/*.less',
      'src/scripts/**/*.jsx'
    ],
    [
      'compile-less',
      'webpack'
    ]
  )
});

gulp.task('build', [
  'dest-fonts',
  'dest-images',
  'dest-html'
]);
