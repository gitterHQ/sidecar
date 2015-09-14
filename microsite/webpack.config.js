var path = require('path');
var objectAssign = require('object-assign');
var webpack = require('webpack');

var productionConfig = require('./webpack.production.config');

var port = parseInt(process.env.PORT, 10) + 1 || 3001;
module.exports = objectAssign({}, productionConfig, {
  //devtool: 'eval-source-map',
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server',
    path.join(__dirname, './src/js/index')
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
