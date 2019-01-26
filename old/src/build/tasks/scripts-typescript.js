const gulp = require('gulp');
const webpack = require('webpack-stream');
const env = require('gulp-environments');
const browserSync = require('browser-sync');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (src) => {
    const webpackPlugins = [];

    if (env.production()) {
        webpackPlugins.push(new uglifyJsPlugin());
    }

    const webpackConfig = {
        'watch': env.development(),
        'devtool': env.development() ? 'inline-source-map' : 'nosources-source-map',
        'output': {'filename': 'app.js'},
        'module': {
            'rules': [
                {
                    'test': /\.ts$/,
                    'exclude': /(node_modules)/,
                    'use': 'ts-loader'
                }
            ]
        },
        'resolve': {
            'extensions': ['.ts', '.js']
        },
        'plugins': webpackPlugins
    };

    return gulp.src(src)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/assets/scripts/'))
        .pipe(browserSync.stream());
};