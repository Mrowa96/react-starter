module.exports = api => {
  const isDevelopment = api.env() === 'development';
  const isTest = api.env() === 'test';

  const presets = [
    !isTest
      ? '@babel/preset-env'
      : [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
    [
      '@babel/preset-react',
      {
        development: isDevelopment || isTest,
        useBuiltIns: true,
      },
    ],
    [
      '@babel/preset-typescript',
      {
        allExtensions: true,
        isTSX: true,
      },
    ],
  ];

  const plugins = [
    [
      '@babel/plugin-transform-destructuring',
      {
        useBuiltIns: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        useBuiltIns: true,
      },
    ],
    [
      '@babel/plugin-proposal-optional-chaining',
      {
        loose: true,
      },
    ],
    '@babel/plugin-transform-runtime',
  ];

  return {
    presets,
    plugins,
  };
};
