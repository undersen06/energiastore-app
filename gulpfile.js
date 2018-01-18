var gulp = require("gulp");
var gutil = require("gulp-util");
var bower = require("bower");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var sh = require("shelljs");
var transpile = require("gulp-babel-transpiler");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const minify = require("gulp-babel-minify");
const jshint = require("gulp-jshint");
var jslint = require("gulp-jslint");
const eslint = require("gulp-eslint");

// gulp.task('babel-transpiler-', () =>
//     gulp.src('./www/js/*/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['env']
//         }))
//         .pipe(concat('all.js'))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('dist'))
// );

gulp.task("lint", function() {
  return gulp
    .src(["./www/js/*/*/*js", "./www/js/*/*js"])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task("babel-transpiler", () =>
  gulp
    .src(["./www/src/js/*/*.js", "./www/src/js/*/*/*.js"])
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(gulp.dest("./www/js/"))
);

gulp.task("minify", () =>
  gulp
    .src(["./www/src/js/*/*.js", "./www/src/js/*/*/*.js"])
    .pipe(
      minify({
        mangle: {
          keepClassName: true
        }
      })
    )
    .pipe(gulp.dest("././www/dist/"))
);

var paths = {
  sass: ["./scss/**/*.scss"]
};

gulp.task("default", ["sass"]);

gulp.task("sass", function(done) {
  gulp
    .src("./scss/ionic.app.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(gulp.dest("./www/css/"))
    .pipe(
      minifyCss({
        keepSpecialComments: 0
      })
    )
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./www/css/"))
    .on("end", done);
});

gulp.task("watch", ["sass"], function() {
  gulp.watch(paths.sass, ["sass"]);
});

gulp.task("install", ["git-check"], function() {
  return bower.commands.install().on("log", function(data) {
    gutil.log("bower", gutil.colors.cyan(data.id), data.message);
  });
});

gulp.task("git-check", function(done) {
  if (!sh.which("git")) {
    console.log(
      "  " + gutil.colors.red("Git is not installed."),
      "\n  Git, the version control system, is required to download Ionic.",
      "\n  Download git here:",
      gutil.colors.cyan("http://git-scm.com/downloads") + ".",
      "\n  Once git is installed, run '" +
        gutil.colors.cyan("gulp install") +
        "' again."
    );
    process.exit(1);
  }
  done();
});
