module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
    'jest-enzyme',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['flowtype', 'react', 'prettier', 'jest', 'jsx-a11y'],
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
    'flowtype/no-types-missing-file-annotation': 'off',
    'import/no-unresolved': 'off',
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  settings: {
    react: {
      version: '16',
    },
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },
};
