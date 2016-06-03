var gulp = require('gulp');
var flatten = require('gulp-flatten');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('connect', function() {
    return connect.server({
        root: 'public',
        port: 8000,
        livereload: true
    });
});

gulp.task('sass', function() {
    return sass('sass/*.scss')
        .pipe(gulp.dest('./public/css'));
});

gulp.task('browserify', function() {
    return browserify('./app/app.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('static', function() {
    return gulp.src('./app/*/*.html')
        .pipe(flatten())
        .pipe(gulp.dest('./public/tpl'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify']);
    gulp.watch('app/**/*.html', ['static']);
    gulp.watch('sass/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'watch']);
