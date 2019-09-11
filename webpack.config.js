require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { WatchIgnorePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV || 'production';
const ANALYZE_BUILD = process.env.ANALYZE_BUILD === '1';
const APP_TITLE = process.env.APP_TITLE || 'React boilerplate';
const APP_DESCRIPTION =
  process.env.APP_DESCRIPTION ||
  'React boilerplate for developing web applications.';

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
const babelLoader = {
  loader: 'babel-loader',
  options: isDev
    ? {}
    : { cacheDirectory: true, cacheCompression: true, compact: true },
};

module.exports = {
  mode: ENV,
  entry: './src/index.tsx',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        include: path.resolve(__dirname, 'src'),
      },
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            include: path.resolve(__dirname, 'src'),
            use: [
              babelLoader,
              {
                loader: 'ts-loader',
              },
            ],
          },
          {
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname, 'src'),
            use: [babelLoader],
          },
          {
            test: /\.css$/,
            use: [
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'typings-for-css-modules-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  namedExport: true,
                  camelCase: true,
                  exportOnlyLocals: true,
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
    new WatchIgnorePlugin([/css\.d\.ts$/]),
    new CleanWebpackPlugin(),
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
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
    new OptimizeCSSAssetsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public/robots.txt'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: ANALYZE_BUILD ? 'static' : 'disabled',
    }),
  ],
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    hot: false,
    inline: false,
    stats,
    historyApiFallback: true,
  },
  stats,
};
