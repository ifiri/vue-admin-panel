module.exports = {
  presets: [
    [
      '@vue/app',
      {
        polyfills: [
          'web.immediate'
        ],
        useBuiltIns: 'entry',
      },
    ],
    '@vue/babel-preset-jsx',
  ],
  plugins: [
    [
      '@babel/plugin-transform-spread',
      {
        'loose': true,
      }
    ],
    [
      '@babel/plugin-transform-for-of',
      {
        'assumeArray': true,
      }
    ]
  ],
};
