
var gulp = require('gulp');
var gutil = require('gulp-util');

var less = require('gulp-less');
var sass = require('gulp-sass');
var stylus = require('gulp-stylus');


var md5 = require('gulp-md5-assets');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var patterns = {
  jsx: './src/js/**/*.jsx',
  css: './src/js/**/*.css',
  styl: './src/css/**/*.styl',
  less: './src/css/**/*.less',
  scss: './src/css/**/*.scss'
};

var watchFiles = [
  patterns.jsx,
  patterns.styl,
  patterns.less,
  patterns.scss
];

// ============== compile =============
gulp.task('compile-styl', function () {
  gulp.src(patterns.styl)
    .pipe(stylus({
      compress: true,
      'include css': true
    }))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('compile-less', function () {
  gulp.src(patterns.less)
    .pipe(less())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('compile-scss', function () {
  gulp.src(patterns.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
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
  return gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('dest-fonts', function(){
  return gulp.src([
    'bower_components/font-awesome/fonts/*',
  ]).pipe(gulp.dest('./dist/fonts'));
});

// gulp.task('dest-js', ['webpack'], function () {
//   return gulp.src('./src/js/**/*')
//     .pipe(gulp.dest('./dist/js'));
// });

// gulp.task('dest-css',['compile-styl','compile-less','compile-scss'], function () {
//   return gulp.src('./src/css/**/*')
//     .pipe(gulp.dest('./dist/css'));
// });

gulp.task('dest-html', function() {
  gulp.src('./src/*.html')
    .pipe(htmlreplace({
        'css': 'css/3rd.part.css'
        // 'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compress-js', ['webpack'], function() {
  return gulp.src('./src/js/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('compress-css', function() {
  return gulp.src('./src/css/app.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('concat-css', function () {
  return gulp.src([
    'bower_components/font-awesome/css/font-awesome.css'
  ])
  .pipe(concatCss('3rd.part.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest('./dist/css'));
});


gulp.task('md5-css', ['dest-html','compress-css','concat-css'], function () {
  gulp.src([
    './dist/css/*.css'
  ])
  .pipe(md5(10,'./dist/*.html'))
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('md5-js', ['compress-js','md5-css'], function () {
  gulp.src([
    './dist/js/*.js'
  ])
  .pipe(md5(10,'./dist/*.html'))
  .pipe(gulp.dest('./dist/js'));
});

// ============== watch =============
gulp.watch(watchFiles, ['webpack','compile-styl','compile-less','compile-scss'], function(event) {
  // gulp.watch(watchFiles, ['webpack']);
  // console.log(event.path + '^_^')
});


gulp.task('compile',['webpack','compile-styl','compile-less','compile-scss']);
gulp.task('default',['webpack','compile-styl','compile-less','compile-scss']);
gulp.task('build', [
  // 'webpack',
  'compile-styl',
  'compile-less',
  'compile-scss',
  // 'dest-js',
  // 'dest-css',
  // 'dest-html',
  'dest-images',
  'dest-fonts',
  'md5-js'
  // 'compress-js',
  // 'concat-css',
  // 'md5-css'
]);
