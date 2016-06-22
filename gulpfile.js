var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var flatten = require('gulp-flatten');
var sass = require('gulp-ruby-sass');
var source = require('vinyl-source-stream');
var html2js = require('gulp-html2js');


gulp.task('connect', function() {
    connect.server({
        root: 'public',
        port: 8000,
        livereload: true
    });
});

gulp.task('tpl', function () {
    gulp.src('src/*.html')
        .pipe(html2js('templates.js', {
            adapter: 'angular',
            name: 'pdf.viewer'
        }))
        .pipe(gulp.dest('src/'));
});

gulp.task('js', function() {
    gulp.src(['src/index.js', 'src/templates.js', 'src/*.js'])
        .pipe(concat('pdfViewer.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function() {
    sass('sass/*.scss')
        .pipe(gulp.dest('public/css'));
});

gulp.task('browserify', function() {
    browserify({ entries: ['app/app.js', 'dist/pdfViewer.js'] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('static', function() {
    gulp.src('app/*/*.html')
        .pipe(flatten())
        .pipe(gulp.dest('public/tpl'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify']);
    gulp.watch('src/**/*.*', ['tpl', 'js']);
    gulp.watch('app/**/*.html', ['static']);
    gulp.watch('sass/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'watch']);