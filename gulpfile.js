var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();


gulp.task('default', ['connect', 'pdfViewer', 'app', 'watch']);

gulp.task('connect', function() {
    $.connect.server({
        root: 'public',
        port: 8080
    });
});

/**************************************/
/*          PDF Viewer Tasks          */
/**************************************/
gulp.task('pdf-less', function() {
    return gulp.src('pdfViewer/less/pdf-viewer.less')
        .pipe($.less({
            paths: [path.join(__dirname, 'pdfViewer', 'less', 'includes')]
        }))
        .pipe(gulp.dest('./static/pdfjs'));
});

gulp.task('pdf-static', function() {
    return gulp.src('static/**')
        .pipe(gulp.dest('public/lib'));
});

gulp.task('pdf-tpl', function() {
    return gulp.src('pdfViewer/*.html')
        .pipe($.html2js('pdfViewer.tpl.js', {
            adapter: 'angular',
            name: 'pdf.viewer'
        }))
        .pipe(gulp.dest('tmp'));
});

gulp.task('pdf-js', function() {
    return gulp.src(['pdfViewer/module.js', 'tmp/pdfViewer.tpl.js', 'pdfViewer/**/*.js'])
        .pipe($.concat('pdfViewer.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('pdf-lib', function() {
    return gulp.src('dist/**')
        .pipe(gulp.dest('public/lib/pdfViewer'));
});

gulp.task('pdfViewer', runSequence('pdf-less', 'pdf-static', 'pdf-tpl', 'pdf-js', 'pdf-lib'));

/**************************************/
/*          Demo App Tasks            */
/**************************************/
gulp.task('app-less', function() {
    return gulp.src('app/less/style.less')
        .pipe($.less({
            paths: [path.join(__dirname, 'app', 'less', 'includes')]
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('app-static', function() {
    return gulp.src('app/**/*.html')
        .pipe($.flatten())
        .pipe(gulp.dest('public/tpl'));
});

gulp.task('app-js', function() {
    return gulp.src(['app/app.js', 'app/**/*.js'])
        .pipe($.concat('main.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('app', runSequence('app-less', 'app-static', 'app-js'));


/**************************************/
/*           Develop Watch            */
/**************************************/
gulp.task('watch', function() {
    gulp.watch('pdfViewer/**/*.html', ['pdfViewer']);
    gulp.watch('pdfViewer/**/*.js', ['pdfViewer']);
    gulp.watch('pdfViewer/less/**/*.less', ['pdfViewer']);
    gulp.watch('app/less/**/*.less', ['app-less']);
    gulp.watch('app/**/*.html', ['app-static']);
    gulp.watch('app/**/*.js', ['app-js']);
});

/**************************************/
/*          Production Build          */
/**************************************/
gulp.task('min', function() {
    gulp.src('public/js/main.js')
        .pipe($.minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('prod', ['demo', 'min']);