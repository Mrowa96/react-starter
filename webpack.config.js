const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const ENV =
  typeof process.env.NODE_ENV !== 'undefined'
    ? process.env.NODE_ENV
    : 'production';
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
    new CleanWebpackPlugin(['dist/*.*']),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './public/index.html',
      filename: 'index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './public/icon.png',
      title: 'Frontend boilerplate',
      background: '#fff',
    }),
  ],
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    hot: false,
    inline: false,
  },
};
