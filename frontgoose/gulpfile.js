var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('process-styles', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass({
            //style: 'expanded',
            includePaths: ['bower_components/foundation/scss']
        }))
        //.pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./css/'))
        //.pipe(rename({suffix: '.min'} ))
        //.pipe(minifycss())
        //.pipe(gulp.dest('css/'))
});

gulp.task('process-scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dest/scripts/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dest/scripts/'))
});
