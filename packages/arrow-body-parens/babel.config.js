const babelConfig = {
  env: {
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: false,
          },
        ],
      ],
    },

    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: false,
          },
        ],
      ],
    },

    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            useBuiltIns: false,
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
  },
}

module.exports = babelConfig
