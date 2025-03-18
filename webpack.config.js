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

    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'process': 'process/browser.js'
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