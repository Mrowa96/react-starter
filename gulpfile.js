/* eslint-disable */
const gulp = require('gulp');
const sass = require('gulp-sass');
const env = require('gulp-environments');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync');
const twig = require('gulp-twig');
const htmlBeautify = require('gulp-html-beautify');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const webpack = require('webpack-stream');
const prod = env.production;
const dev = env.development;

gulp.task('fonts', () => {
    return gulp.src(['./node_modules/font-awesome/fonts/**.*'])
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(dev(browserSync.stream()));
});

gulp.task('images', ['sprites'], () => {
    return gulp.src('./src/assets/images/*.*')
        .pipe(gulp.dest('dist/assets/images'))
        .pipe(dev(browserSync.stream()));
});

gulp.task('styles', ['sprites'], () => {
    return gulp.src('./src/assets/styles/**/*.scss')
        .pipe(dev(sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(prod(cleanCss({
            compatibility: 'ie11',
            restructuring: false,
            processImport: false
        })))
        .pipe(dev(sourcemaps.write('./')))
        .pipe(gulp.dest('./dist/assets/styles'))
        .pipe(dev(browserSync.stream()));
});

gulp.task('scripts', () => {
    const webpackConfig = {
        'watch': dev(),
        'output': {'filename': 'app.js'},
        'module': {
            'rules': [
                {
                    'test': /\.js$/,
                    'exclude': /(node_modules)/,
                    'use': {
                        'loader': 'babel-loader',
                        'options': {
                            'presets': [
                                [
                                    'env',
                                    {
                                        'targets': {
                                            'browsers': [
                                                'last 2 versions',
                                                'ie >= 11'
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                }
            ]
        }
    };

    return gulp.src('./src/assets/scripts/app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/assets/scripts/'))
        .pipe(browserSync.stream());
});


gulp.task('sprites', function () {
    const spriteData = gulp.src('./src/assets/images/sprites/*.{png,jpg}')
        .pipe(spritesmith({
            imgName: 'sprites.png',
            cssName: '_sprites.scss',
            imgPath: '../../assets/images/sprites.png'
        }));

    const imgStream = spriteData.img
        .pipe(dev(buffer()))
        .pipe(dev(imagemin()))
        .pipe(gulp.dest('./src/assets/images/'));

    const cssStream = spriteData.css
        .pipe(gulp.dest('./src/assets/styles/'));

    return merge(imgStream, cssStream);
});

gulp.task('templates', () => {
    return gulp.src('./src/templates/page/*.twig')
        .pipe(twig())
        .pipe(htmlBeautify())
        .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: './dist'
        },
        open: 'external',
        notify: false
    });
});

gulp.task('watch', () => {
    gulp.watch('src/assets/styles/**/*.scss', ['styles']);
    gulp.watch('src/assets/images/**/*', ['images']);
    gulp.watch('src/templates/**/*.twig', ['templates']);
});

if (dev()) {
    gulp.task('default', [
        'fonts',
        'styles',
        'scripts',
        'images',
        'templates',
        'browser-sync',
        'watch'
    ]);
} else {
    gulp.task('default', [
        'fonts',
        'styles',
        'scripts',
        'images',
        'templates'
    ]);
}
