require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ENV = process.env.NODE_ENV || 'production';
const APP_TITLE = process.env.APP_TITLE || 'Frontend boilerplate';

const isDev = ENV === 'development';

module.exports = {
  mode: ENV,
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: path.resolve(__dirname, 'src'),
      },
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            options: isDev
              ? {}
              : {
                  cacheDirectory: true,
                  cacheCompression: true,
                  compact: true,
                },
          },
          {
            test: /\.css$/,
            use: [
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                },
              },
              'postcss-loader',
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: APP_TITLE,
      inject: true,
      hash: true,
      template: './public/index.html',
      filename: 'index.html',
      cache: true,
    }),
    new WebappWebpackPlugin({
      logo: './public/icon.png',
      cache: true,
      inject: true,
      favicons: {
        background: '#fff',
        appName: APP_TITLE,
      },
    }),
    new OptimizeCSSAssetsPlugin(),
  ],
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    hot: false,
    inline: false,
  },
};
