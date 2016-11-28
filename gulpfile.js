'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    reload = browserSync.reload;


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

var config = {
    server: {
        baseDir: "frontend/build"
    },
    tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: "Frontend_Devil"
};


// Configuration
//
var config = extend({
    env: process.env.NODE_ENV
}, parseArgs(process.argv.slice(2)));

// Getters / Setters
//
gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = config.env = 'development';
});
gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = config.env = 'production';
});

/*Tasks*/

gulp.task('style:build', function() {
    gulp.src(path.src.style) //get main.scss
        .pipe(gulpif(config.env === 'development', sourcemaps.init())) //init sourcemap
        .pipe(sass()) //compile
        .pipe(gulpif(config.env === 'production', cssmin())) //compressing css
        .pipe(gulpif(config.env === 'development', sourcemaps.write())) //write sourcemap
        .pipe(gulp.dest(path.build.css)) //put compressed files to the build
        .pipe(reload({
            stream: true
        })); //refresh server
});


gulp.task('js:build', function() {
    gulp.src(path.src.js) //get main.js
        .pipe(gulpif(config.env === 'development', sourcemaps.init())) //init sourcemap
        .pipe(gulpif(config.env === 'development', sourcemaps.write())) //write sourcemap
        .pipe(gulp.dest(path.build.js)) //put compressed files to the build
        .pipe(reload({
            stream: true
        })); //refresh server
});

gulp.task('lib:copy', function() {
    gulp.src(path.lib.js) //get main.js
        .pipe(gulpif(config.env === 'development', sourcemaps.init())) //init sourcemap
        .pipe(gulpif(config.env === 'development', sourcemaps.write())) //write sourcemap
        .pipe(gulp.dest(path.copy.js)) //put compressed files to the build
        .pipe(reload({
            stream: true
        })); //refresh server
});


gulp.task('lib:build', function() {
    gulp.src(path.lib.js) //get main.js
        .pipe(gulpif(config.env === 'development', sourcemaps.init())) //init sourcemap
        .pipe(gulpif(config.env === 'development', sourcemaps.write())) //write sourcemap
        .pipe(gulp.dest(path.build.js)) //put compressed files to the build
        .pipe(reload({
            stream: true
        })); //refresh server
});

gulp.task('concat', function() {
    gulp.src(path.src.concatJS)
        .pipe(gulpif(config.env === 'development', sourcemaps.init())) //init sourcemap
        .pipe(concat('all.js'))
        .pipe(gulpif(config.env === 'development', sourcemaps.write())) //write sourcemap
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('webserver', function() {
    browserSync(config);
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

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});

//development is default
gulp.task('default', ['prod']);


gulp.task('dev', ['set-dev-node-env'], function() {
    return runSequence(
        'build',
        'watch'
    );
});

gulp.task('prod', ['set-prod-node-env'], function() {
    return runSequence(
        'build'
    );
});
