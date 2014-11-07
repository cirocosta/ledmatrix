'use strict';

var webpack = require('webpack');

var cfg = {
  entry: './src/main.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },
  externals: {
    yaspm: 'commonjs yaspm'
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
  },
  plugins: [
    new webpack.DefinePlugin({
      '__NODEWEBKIT__': process.env.NODE_ENV === 'nodewebkit',
    })
  ]
};

module.exports = cfg;
