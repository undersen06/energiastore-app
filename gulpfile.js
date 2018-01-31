var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var changed = require('gulp-changed');
var replace = require('gulp-replace');
var uglifycss = require('gulp-uglifycss');

var paths = {
  sass: ['./www/js/**/*.scss'],
  css: ['./www/js/**/*.css']
};

gulp.task('sass', function(done) {
    console.log("Sass compilation");
    gulp.src(paths.sass)
        // .pipe(changed(_baseDest)) TODO fix
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(_baseDest))
        .on('end', done);

    function _baseDest(file) {
        return file.base;
    }
});

gulp.task('css', function () {
  gulp.src(paths.css)
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
     .pipe(gulp.dest('./dist/'));

    // function _baseDest(file) {
    //     return file.base;
    // }
});

gulp.task('change-enviroment', function() {
    console.log("Changing enviroment");
    var env = (process.env.APP_ENV + '').toLowerCase();
    if (env !== 'test' && env !== 'dev' &&  env !== 'prod') {
        env = 'prod';
    }
    gulp.src(['www/config/config.js'])
        .pipe(replace(/environment: "(.*)"/, 'environment: "' + env +'"'))
        .pipe(gulp.dest('www/config/'));
});

gulp.task('watch', function() {
    console.log("Watching sass files");
    gulp.watch(paths.sass, ['sass','css']);
});

// gulp.task('default', ['sass','css']);
//
// //OLD CLI
// gulp.task('serve:before', ['change-enviroment', 'sass', 'watch','css']);
//
// gulp.task('run:before', ['change-enviroment', 'sass','css']);
//
// gulp.task('build:before', ['change-enviroment', 'sass','css']);
//
// //NEW CLI
// gulp.task('ionic:watch:before', ['change-enviroment', 'sass','css']);
//
// gulp.task('ionic:build:before', ['change-enviroment', 'sass','css']);


gulp.task('default', ['sass']);

//OLD CLI
gulp.task('serve:before', ['change-enviroment', 'sass', 'watch']);

gulp.task('run:before', ['change-enviroment', 'sass']);

gulp.task('build:before', ['change-enviroment', 'sass']);

//NEW CLI
gulp.task('ionic:watch:before', ['change-enviroment', 'sass']);

gulp.task('ionic:build:before', ['change-enviroment', 'sass']);
