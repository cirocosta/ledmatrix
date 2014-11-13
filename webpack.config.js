'use strict';

var webpack = require('webpack');

var cfg = {
  entry: './src/main.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },
  externals: {
    yaspm: 'commonjs yaspm',
    mdns: 'commonjs mdns',
    express: 'commonjs express',
    'socket.io': 'commonjs socket.io',
    portscanner: 'commonjs portscanner',
    qrcode: 'commonjs qrcode',
  },
  target: process.env.NODE_ENV === 'web' ? 'web' : 'node-webkit',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?includePaths[]=' +
                __dirname + '/src'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'jsx-loader?harmony'
      }
    ]
  }
};

module.exports = cfg;
