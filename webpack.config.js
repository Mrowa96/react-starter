require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV || 'production';
const APP_TITLE = process.env.APP_TITLE || 'Frontend boilerplate';
const APP_DESCRIPTION =
  process.env.APP_DESCRIPTION ||
  'Frontend boilerplate for developing basic web applications based on React.';

const isDev = ENV === 'development';
const stats = {
  assets: true,
  children: false,
  entrypoints: false,
  chunks: false,
  colors: true,
  performance: false,
  usedExports: false,
  modules: false,
};

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
          {
            test: /\.svg$/,
            loader: 'raw-loader',
          },
          {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader?name=i/[hash].[ext]',
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
      meta: {
        description: APP_DESCRIPTION,
      },
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
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/assets/sprites'),
        glob: '*.png',
      },
      target: {
        image: path.resolve(__dirname, 'public/sprite.png'),
        css: path.resolve(__dirname, 'src/styles/sprite.css'),
      },
      apiOptions: {
        cssImageRef: '/sprite.png',
      },
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public/robots.txt'),
        to: path.resolve(__dirname, 'dist'),
      },
      {
        from: path.resolve(__dirname, 'public/sprite.png'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
  ],
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    hot: false,
    inline: false,
    stats,
  },
  stats,
};
