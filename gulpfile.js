'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    jsmin = require('gulp-jsmin'),
    runSequence = require('run-sequence');

var path = {
    build: { //building files
        js: 'frontend/build/js/',
        css: 'frontend/build/css/',
        fonts: 'frontend/build/fonts/bootstrap/'
    },
    copy: { //building files
        js: 'src/js/',
        css: ['bower_components/angular-toastr/dist/angular-toastr.min.css',
            'bower_components/angular-responsive-tables/release/angular-responsive-tables.min.css',
            'bower_components/bootstrap-sass/assets/stylesheets/**/*'
        ]
    },
    src: { //source files
        style: 'src/style/main.scss',
        bootstrap: 'src/style/bootstrap/',
        js: ['src/js/**/*.js']
    },
    lib: { //source files
        js: ['bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/satellizer/dist/satellizer.js',
            'bower_components/angular-toastr/dist/angular-toastr.js',
            'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/satellizer/dist/satellizer.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-responsive-tables/release/angular-responsive-tables.js',
            'bower_components/angular-messages/angular-messages.js'
        ],
        fonts: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/**/*',
        css: ['bower_components/angular-toastr/dist/angular-toastr.min.css',
            'bower_components/angular-responsive-tables/release/angular-responsive-tables.min.css'
        ],
        bootstrap: 'bower_components/bootstrap-sass/assets/stylesheets/**/*'
    },
    watch: { //watch changes form those files
        style: 'src/style/**/*.scss'
    }
};

/*Tasks*/

gulp.task('style:build', function() {
    gulp.src(path.src.style) //get main.scss
        .pipe(sass()) //compile
        .pipe(gulp.dest(path.build.css)); //put compiled files to the build

});
gulp.task('bootstrap:copy', function() { //copy bootstrap scss from bower_components to src
    gulp.src(path.lib.bootstrap)
        .pipe(gulp.dest(path.src.bootstrap))
});
gulp.task('lib:copy', function() {
    gulp.src(path.lib.js)
        .pipe(gulp.dest(path.copy.js))
});
gulp.task('css:copy', function() { //copy css directly from bower_components to build
    gulp.src(path.lib.css)
        .pipe(gulp.dest(path.build.css))
});
gulp.task('fonts:build', function() {
    gulp.src(path.lib.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(jsmin())
        .pipe(gulp.dest(path.build.js)) //put compressed files to the build
});
gulp.task('watch', function() {
    gulp.watch(path.watch.style, ['style:build']);
});

/*Run task*/

gulp.task('build', function() {
    runSequence('lib:copy',
        'bootstrap:copy',
        'js:build',
        'fonts:build',
        'css:copy',
        'style:build')
});

gulp.task('default', ['build']);
