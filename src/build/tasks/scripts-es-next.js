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
                            ],
                            'plugins': [
                                'transform-class-properties',
                            ]
                        }
                    }
                }
            ]
        },
        'plugins': webpackPlugins
    };

    return gulp.src(src)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/assets/scripts/'))
        .pipe(browserSync.stream());
};