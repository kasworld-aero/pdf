var gulp = require('gulp');
var path = require('path');
var browserify = require('browserify');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var connect = require('gulp-connect');
var flatten = require('gulp-flatten');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var html2js = require('gulp-html2js');


gulp.task('src-tpl', function() {
    gulp.src('src/*.html')
        .pipe(html2js('templates.js', {
            adapter: 'angular',
            name: 'pdf.viewer'
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('src-js', function() {
    gulp.src(['src/index.js', 'src/templates.js', 'src/*.js'])
        .pipe(concat('pdfViewer.js'))
        .pipe(gulp.dest('dist/'));
});



// for test app in app folder
gulp.task('connect', function() {
    connect.server({
        root: 'public',
        port: 8000,
        livereload: true
    });
});
//
// gulp.task('sass', function() {
//     sass('sass/*.scss')
//         .pipe(gulp.dest('public/css'));
// });

gulp.task('less', function () {
  return gulp.src('./less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('browserify', function() {
    browserify({ entries: ['app/app.js', 'dist/pdfViewer.js'] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('static', function() {
    gulp.src('app/*/*.html')
        .pipe(flatten())
        .pipe(gulp.dest('public/tpl'));
});

gulp.task('app', ['less', 'static', 'browserify'], function() {
    gulp.src('public/js/main.js')
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['src-tpl']);
    gulp.watch('src/**/*.js', ['src-js', 'browserify']);
    gulp.watch('app/**/*.js', ['browserify']);
    gulp.watch('app/**/*.html', ['static']);
    gulp.watch('less/**/*.less', ['less']);
});

gulp.task('default', ['connect', 'src-tpl', 'src-js', 'app', 'watch']);



// gh-pages
gulp.task('gh-pages', ['src-tpl', 'src-js', 'app']);
