const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = typeof(process.env.NODE_ENV) !== "undefined" ? process.env.NODE_ENV : 'production';
const isDev = ENV === 'development';

module.exports = {
    mode: ENV,
    entry: './src/index.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx)$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        options: isDev ? {} : {
                            cacheDirectory: true,
                            cacheCompression: true,
                            compact: true,
                        },
                    },
                    {
                        test: /\.css$/,
                        use: [
                            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                            'css-loader',
                            'postcss-loader',
                        ],
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*.*']),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    devtool: isDev ? 'source-map' : false,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        hot: false,
        inline: false,
    }
};
