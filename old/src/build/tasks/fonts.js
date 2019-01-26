const gulp = require('gulp');
const env = require('gulp-environments');
const browserSync = require('browser-sync');

module.exports = (src) => {
    return gulp.src(src)
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(env.development(browserSync.stream()));
};