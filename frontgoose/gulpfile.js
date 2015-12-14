var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require("gulp-minify-css"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify");

gulp.task("process-styles", function() {
    return gulp.src("scss/*.scss")
        .pipe(sass({
            style: "expanded",
            includePaths: ["bower_components/foundation/scss"]
        }))
        .pipe(autoprefixer("last 2 version"))
        .pipe(gulp.dest("css/"))
        .pipe(rename({suffix: ".min"} ))
        .pipe(minifycss())
        .pipe(gulp.dest("css/"))
});

gulp.task("process-scripts", function() {
    return gulp.src("js/src/*.js")
        .pipe(concat("app.js"))
        .pipe(gulp.dest("js/"))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest("js/"))
});

gulp.task("default", function() {
    gulp.watch("scss/*.scss", ["process-styles"])
    gulp.watch("js/src/*.js", ["process-scripts"])
});
