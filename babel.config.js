module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@routes': './src/routes',
          '@models': './src/models',
          '@repositories': './src/repositories',
          '@services': './src/services',
          '@components': './src/components',
          '@layouts': './src/layouts',
          '@configs': './src/configs',
          '@interfaces': './src/typescript/interfaces',
          '@constants': './src/constants',
          '@schemas': './src/graphql/schemas',
          '@resolvers': './src/graphql/resolvers',
          '@queries': './src/graphql/queries',
          '@mutations': './src/graphql/mutations',
          '@styles': './src/styles',
          '@hooks': './src/hooks',
          '@helpers': './src/helpers',
          '@validations': './src/validations',
          '@contexts': './src/contexts',
          '@db': './src/db',
          '@typescript': './src/typescript',
          '@types': './src/types',
          '@repository': './src/repositories',
          '@atoms': './src/components/atoms',
          '@molecules': './src/components/molecules',
          '@widgets': './src/components/widgets',
          '@mock': './src/mock',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
