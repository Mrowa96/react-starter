const gulp = require('gulp');
const env = require('gulp-environments');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const browserSync = require('browser-sync');

module.exports = function (src) {
    return gulp.src(src)
        .pipe(iconfontCss({
            fontName: 'tavoite',
            path: './src/assets/var/_icons_template.scss',
            targetPath: '../../../src/assets/styles/_icons.scss',
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: 'tavoite',
            normalize: true,
            fontHeight: 1000
        }))
        .pipe(gulp.dest('./dist/assets/fonts/'))
        .pipe(env.development(browserSync.stream()));
};