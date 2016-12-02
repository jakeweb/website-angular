'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject');

var path = {
    build: { //building files
        js: 'frontend/build/js/',
        css: 'frontend/build/css/'
    },
    copy: { //building files
        js: 'src/js/**/*.js'
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
    }
};

/*Tasks*/

gulp.task('style:build', function() {
    return gulp.src(path.src.style) //get main.scss
        .pipe(sass()) //compile
        .pipe(gulp.dest(path.build.css)) //put compressed files to the build
});

gulp.task('js:build', function() {
    gulp.src(path.src.js) //get main.js
        .pipe(gulp.dest(path.build.js)) //put compressed files to the build
});



gulp.task('concat', function() {
    gulp.src(path.src.concatJS)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(path.build.js));
    // gulp.src('./frontend/app/app.js')
    //     .pipe(inject(
    //         gulp.src([path.copy.js]).pipe(angularFilesort())
    //     ))
    //     .pipe(gulp.dest(path.build.js));
});

gulp.task('watch', function() {
    gulp.watch(path.watch.style, ['style:build']);
    gulp.watch(path.watch.concatJS, ['js:build']);
});


/*Run task*/

gulp.task('build', [
    'js:build',
    'style:build',
    'concat'
]);

gulp.task('default', ['build']);
