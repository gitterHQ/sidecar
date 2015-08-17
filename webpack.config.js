var path = require('path');

var autoprefixer = require('autoprefixer');
var csswring = require('csswring');
var nested = require('postcss-nested');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'sidecar.js',
		library: 'sidecare',
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
				loader: 'style-loader!css-loader!postcss-loader'
			}
		]
	},
	postcss: function () {
		return [
			nested,
			autoprefixer,
			csswring
		];
	}
};
