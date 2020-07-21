module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-import': {
      path: ['src/styles'],
    },
    'postcss-preset-env': {
      stage: 1,
    },
  },
};
