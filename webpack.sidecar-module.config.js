var path = require('path');
var objectAssign = require('object-assign');
var webpackConfig = require('./webpack.config');

module.exports = objectAssign({}, webpackConfig, {
	entry: './src/index.module.js',
	output: {
      path: path.join(__dirname, 'dist'),
	  filename: 'sidecar-module.js',
      library: 'sidecar',
      libraryTarget: 'umd'
	}
});
