const gulp = require('gulp');
const twig = require('gulp-twig');
const htmlBeautify = require('gulp-html-beautify');

module.exports = (src) => {
    return gulp.src(src)
        .pipe(twig())
        .pipe(htmlBeautify())
        .pipe(gulp.dest('dist'));
};