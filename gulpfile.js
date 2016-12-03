'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

var path = {
    build: { //building files
        css: 'frontend/build/css/'
    },
    src: { //source files
        style: 'src/style/main.scss'
    },
    watch: { //watch changes form those files
        style: 'src/style/**/*.scss'
    }
};

/*Tasks*/

gulp.task('style:build', function() {
    return gulp.src(path.src.style) //get main.scss
        .pipe(sass()) //compile
        .pipe(gulp.dest(path.build.css)) //put compressed files to the build
});

gulp.task('watch', function() {
    gulp.watch(path.watch.style, ['style:build']);
});


/*Run task*/

gulp.task('build', [
    'style:build'
]);

gulp.task('default', ['build']);
