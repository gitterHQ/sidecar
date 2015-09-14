var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, './src/js/index')
  ],
  output: {
    path: path.join(__dirname, './dist/js/'),
    filename: 'build.js',
    publicPath: 'js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
