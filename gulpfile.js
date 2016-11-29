'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

var path = {
    build: { //building files
        js: 'frontend/build/js/',
        css: 'frontend/build/css/'
    },
    copy: { //building files
        js: 'src/js/'
    },
    src: { //source files
        js: ['src/js/**/*.js'], //we need all js files
        style: 'src/style/main.scss', //we need only main.css
        concatJS: ["frontend/app/app.js"]
    },
    lib: { //source files
        js: ['src/lib/angular/angular.js']
    },
    watch: { //watch changes form those files
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        concatJS: 'frontend/app/**/*.*'
    },
    clean: 'frontend/build'
};

/*Tasks*/

gulp.task('style:build', function() {
    gulp.src(path.src.style) //get main.scss
        .pipe(sass()) //compile
        .pipe(gulp.dest(path.build.css)) //put compressed files to the build
});

gulp.task('js:build', function() {
    gulp.src(path.src.js) //get main.js
        .pipe(gulp.dest(path.build.js)) //put compressed files to the build
});

gulp.task('lib:copy', function() {
    gulp.src(path.lib.js) //get main.js
        .pipe(gulp.dest(path.copy.js)) //put compressed files to the build
});


gulp.task('lib:build', function() {
    gulp.src(path.lib.js) //get main.js
        .pipe(gulp.dest(path.build.js)) //put compressed files to the build
});

gulp.task('concat', function() {
    gulp.src(path.src.concatJS)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(path.build.js))
});

gulp.task('watch', function() {
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.concatJS], function(event, cb) {
        gulp.start('concat');
    });
});


/*Run task*/

gulp.task('build', [
    'js:build',
    'lib:build',
    'style:build',
    'lib:copy',
    'concat'
]);

gulp.task('default', ['build']);
gulp.task('watch', ['watch']);
