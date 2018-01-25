const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const env = require('gulp-environments');

module.exports = (src) => {
    const spriteData = gulp.src(src)
        .pipe(spritesmith({
            imgName: 'sprites.png',
            cssName: '_sprites.scss',
            imgPath: '../../assets/images/sprites.png'
        }));

    const imgStream = spriteData.img
        .pipe(env.development(buffer()))
        .pipe(env.development(imagemin()))
        .pipe(gulp.dest('./src/assets/images/'));

    const cssStream = spriteData.css
        .pipe(gulp.dest('./src/assets/styles/'));

    return merge(imgStream, cssStream);
};