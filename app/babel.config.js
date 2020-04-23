module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@components': './src/components',
          '@animations': './src/animations',
          '@screens': './src/screens',
          '@redux': './src/redux',
          '@utils': './src/utils',
          '@api': './src/api',
        },
      },
    ],
  ],
}
