module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo'], './babel.nativewind-preset.js'],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],

          alias: {
            '@': './',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
