var path = require('path');
var webpack = require('webpack');

var manifest = require('./package.json');
var getPostcssPluginStack = require('./postcss-plugin-stack.js');

var commentHeader = 'Gitter Sidecar v' + manifest.version + '\nhttps://sidecar.gitter.im/';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'sidecar.js',
    library: 'sidecar',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'css-loader!postcss-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(commentHeader)
  ],
  postcss: function() {
    return getPostcssPluginStack();
  }
};
