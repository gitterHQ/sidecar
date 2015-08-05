var path = require('path');

module.exports = {
	entry: './index.js',
	output: {
		path: path.join(__dirname, 'dist'),
        filename: 'sidecar.js',
        library: 'sidecare',
        libraryTarget: 'umd'
    },
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			}
		]
	}
};
