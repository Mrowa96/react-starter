const webpackConfig = require('../webpack.config');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async config => {
    // Replace babel-loader with ts-loader
    config.module.rules[0] = webpackConfig.module.rules[1];
    config.module.rules[2] = webpackConfig.module.rules[2];
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
