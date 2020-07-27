require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { WatchIgnorePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { removeJsxAttributesTransformer } = require('typescript-transformer-jsx-remove-attributes');
const packageInfo = require('./package.json');

const ENV = process.env.NODE_ENV || 'production';
const ANALYZE_BUILD = process.env.ANALYZE_BUILD === '1';
const APP_PORT = process.env.APP_PORT || 3000;
const APP_TITLE = packageInfo.name || 'App';
const APP_DESCRIPTION = packageInfo.description || '';

const isDev = ENV === 'development';
const isProd = !isDev;
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
const plugins = [
  new WatchIgnorePlugin([/css\.d\.ts$/]),
  new StylelintPlugin({
    files: '**/*.scss',
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css',
  }),
  new HtmlWebpackPlugin({
    title: APP_TITLE,
    meta: {
      description: APP_DESCRIPTION,
    },
    hash: true,
    template: path.resolve('./src/static/index.ejs'),
    cache: isProd,
  }),
  new FaviconsWebpackPlugin({
    logo: path.resolve('./src/static/images/icon.png'),
    inject: true,
    prefix: 'assets/',
    favicons: {
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        windows: false,
        yandex: false,
      },
    },
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve('./src/static/images'),
        to: path.resolve('./dist/images'),
      },
      {
        from: path.resolve('./src/static/svg'),
        to: path.resolve('./dist/svg'),
      },
      {
        from: path.resolve('./src/static/robots.txt'),
      },
    ],
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: ANALYZE_BUILD ? 'static' : 'disabled',
  }),
];

if (isProd) {
  plugins.push(new OptimizeCSSAssetsPlugin());
}

module.exports = {
  context: __dirname,
  mode: ENV,
  entry: path.resolve('./src/index.tsx'),
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve('./src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [removeJsxAttributesTransformer(['data-testid'])],
          }),
        },
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [path.resolve('./src/styles')],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
    ],
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 300000,
  },
  plugins,
  stats,
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.join('dist'),
    port: APP_PORT,
    hot: false,
    inline: false,
    stats,
    historyApiFallback: true,
  },
};
