
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var md5 = require('gulp-md5-plus');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
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

gulp.task('dest-fonts', function () {
  return gulp.src([
    'src/fonts/*',
  ]).pipe(gulp.dest('dist/fonts'));
});

gulp.task('dest-html', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('compress-js', ['webpack'], function() {
  return gulp.src('src/scripts/app.js')
    .pipe(uglify())
    .pipe(md5(5,'dist/*.html'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('compress-css', ['compile-less'], function() {
  return gulp.src('src/styles/app.css')
    .pipe(cssnano())
    .pipe(md5(5,'dist/*.html'))
    .pipe(gulp.dest('dist/styles'));
});

// ============== watch =============
gulp.task('watch', ['compile-less','webpack'], function() {
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
  'dest-html',
  'compress-css',
  'compress-js'
]);
