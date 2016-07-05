var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var babelify = require('babelify');
var factor = require('factor-bundle');

gulp.task('browserify', function() {
    return browserify({
            entries: ['./src/scripts/app.jsx'],
            extensions: ['.jsx'],
            debug: false
        })
        .transform(babelify, {
          presets: ['es2015', 'react']
        })
        .plugin(factor, {
          o: [
            'public/app.js'
          ]
        })
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('app.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./public/scripts/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('copy', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/scripts/**/*.js', './src/scripts/**/*.jsx'], ['browserify']);
  gulp.watch('./src/scss/*.scss', ['sass']);
  gulp.watch('./src/*.html', ['copy']);
});

gulp.task('default', ['browserify', 'watch']);
