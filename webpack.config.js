const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.web.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|woff2|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets',
              esModule: false
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: /node_modules[\\/]react-native-/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: /node_modules\/react-native-vector-icons/
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-gesture-handler': 'react-native-web',
      'react-native-screens': 'react-native-web',
      'react-native-safe-area-context': 'react-native-web/dist/modules/SafeAreaContext',
      'react-native-safe-area-context/lib/module/SafeAreaProvider': 'react-native-web/dist/modules/SafeAreaContext',
      'react-native-safe-area-context/lib/module/SafeAreaInsetsContext': 'react-native-web/dist/modules/SafeAreaContext',
      'react-native-safe-area-context/lib/module/initialWindowMetrics': 'react-native-web/dist/modules/SafeAreaContext',
      'react-native-maps': 'react-native-web-maps',
      '@react-native-maps/maps': 'react-native-web-maps',
      'react-native-web-maps': { MapView: 'react-native-web-maps', Marker: 'react-native-web-maps/marker' },
      'process': 'process/browser.js',
      '@react-navigation/elements': '@react-navigation/elements/lib/module/index.web'
      '@react-navigation/elements': '@react-navigation/elements/lib/module/index.native',
      'react-native-maps': 'react-native-web-maps',
      '@react-native-firebase/app$': '@react-native-firebase/app/lib/module',
      'react-native-reanimated': 'react-native-web',
      'react-native-vector-icons': 'react-native-vector-icons/dist',
      'react-native-web-maps': 'react-native-web-maps'
    },
    modules: ['node_modules'],
    fallback: {
      'crypto': require.resolve('crypto-browserify'),
      'stream': require.resolve('stream-browserify'),
      'path': require.resolve('path-browserify'),
      'fs': false,
      'process': 'process/browser',
      'buffer': 'buffer'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      process: {env: {}},
      Buffer: ['buffer', 'Buffer']
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 3002,
    open: true,
    hot: true
  },
};