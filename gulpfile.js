
var gulp = require('gulp');
var gutil = require('gulp-util');

var less = require('gulp-less');
var sass = require('gulp-sass');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var md5 = require('gulp-md5-assets');
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var patterns = {
  jsx: './src/js/**/*.jsx',
  css: './src/js/**/*.css',
  styl: './src/css/**/*.styl',
  less: './src/css/**/*.less',
  scss: './src/css/**/*.scss'
}

var watchFiles = [
  patterns.jsx,
  patterns.styl,
  patterns.less,
  patterns.scss
];

gulp.task('dest-js', function () {
	return gulp.src('./src/js/**/*')
		.pipe(gulp.dest('./build/js'));
});

gulp.task('dest-css', function () {
	return gulp.src('./src/css/**/*')
		.pipe(gulp.dest('./build/css'));
});

gulp.task('dest-html', function() {
  gulp.src('./src/*.html')
    .pipe(htmlreplace({
        '3rd.part.css': '3rd.part.css'
        // 'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('dest-images', function () {
	return gulp.src('./src/images/**/*')
		.pipe(gulp.dest('./build/images'));
});

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

gulp.task('concat-css', function() {
  return gulp.src(patterns.css)
    .pipe(concat({ path: 'app.css'}))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('compress-js', ['webpack'], function() {
  return gulp.src('./build/js/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('compress-css', function() {
  return gulp.src('./src/app.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('dest-fonts', function(){
  return gulp.src([
    'bower_components/font-awesome/fonts/*',
  ]).pipe(gulp.dest('./build/fonts'));
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

gulp.watch(watchFiles, ['webpack','compile-styl','compile-less','compile-scss'], function(event) {
  // gulp.watch(watchFiles, ['webpack']);
  // console.log(event.path + '^_^')
});


gulp.task('compile',['webpack','compile-styl','compile-less','compile-scss']);
gulp.task('default',['webpack','compile-styl','compile-less','compile-scss']);
gulp.task('build', ['webpack','dest-js','dest-css','dest-html','dest-images','dest-fonts','compress-js']);
