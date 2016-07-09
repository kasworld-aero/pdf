var gulp = require('gulp');
var browserify = require('browserify');
var path = require('path');
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')();

// idk why but gulp-load-plugins is not picking this one up
var less = require('gulp-less');


gulp.task('default', ['connect', 'app', 'watch']);


/**************************************/
/*          PDF Viewer Tasks          */
/**************************************/
gulp.task('tpl', function(done) {
    gulp.src('pdfViewer/*.html')
        .pipe($.html2js('pdfViewer.tpl.js', {
            adapter: 'angular',
            name: 'pdf.viewer'
        }))
        .pipe(gulp.dest('tmp')
        .on('end', done));
    return done;
});

gulp.task('pdfViewer', ['tpl'], function(done) {
    gulp.src(['pdfViewer/module.js', 'tmp/pdfViewer.tpl.js', 'pdfViewer/**/*.js'])
        .pipe($.concat('pdfViewer.js'))
        .pipe(gulp.dest('dist')
        .on('end', done));
    return done;
});


/**************************************/
/*         Stylesheet Build           */
/**************************************/
gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

/**************************************/
/*          Demo App Tasks            */
/**************************************/
gulp.task('connect', function() {
    $.connect.server({
        root: 'public',
        port: 8000,
        livereload: true
    });
});

gulp.task('browserify', ['pdfViewer'], function() {
    browserify({ entries: ['app/app.js', 'dist/pdfViewer.js'] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('static', function() {
    gulp.src('app/*/*.html')
        .pipe($.flatten())
        .pipe(gulp.dest('public/tpl'));
});

gulp.task('min', function() {
  gulp.src('public/js/main.js')
      .pipe($.minify({
          ext:{
              src:'.js',
              min:'.min.js'
          }
      }))
      .pipe(gulp.dest('public/js'));
});

gulp.task('app', ['less', 'static', 'browserify']);


/**************************************/
/*           Develop Watch            */
/**************************************/
gulp.task('watch', function() {
    gulp.watch('pdfViewer/**/*.html', ['browserify']);
    gulp.watch('pdfViewer/**/*.js', ['browserify']);
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('app/**/*.html', ['static']);
    gulp.watch('app/**/*.js', ['browserify']);
});

/**************************************/
/*             Prod Build             */
/**************************************/
gulp.task('build', ['app', 'min']);
