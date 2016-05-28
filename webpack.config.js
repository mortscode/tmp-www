const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './_src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'js/[name].js'
  },
  resolve: {
    root: path.resolve(__dirname, '_src'),
  },
  plugins: [
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: {
          target: 'http://modprop.craft.dev',
          ws: true
        }
      }
    )
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|public|_src\/js\/vendor/,
        loader: 'eslint-loader'
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|public|_src\/js\/vendor/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: 'file?name=styles/[name].css!sass?sourceMap'
      },
    ],
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, '_src/styles')]
  },
};
