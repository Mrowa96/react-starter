const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const env = require('gulp-environments');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

module.exports = function (src) {
    return gulp.src(src)
        .pipe(env.development(sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(env.production(cleanCss({
            compatibility: 'ie11',
            restructuring: false,
            processImport: false
        })))
        .pipe(env.development(sourcemaps.write('./')))
        .pipe(gulp.dest('./dist/assets/styles'))
        .pipe(env.development(browserSync.stream()));
};