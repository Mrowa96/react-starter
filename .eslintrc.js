module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'consistent-return': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
  },
  env: {
    browser: true,
  },
};
