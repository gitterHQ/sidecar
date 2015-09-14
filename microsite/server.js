var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = parseInt(process.env.PORT, 10) + 1 || 3001;
var contentBase = __dirname;
console.log('Dev server contentBase', contentBase);
new WebpackDevServer(webpack(config), {
  //contentBase: contentBase,
  publicPath: config.output.publicPath,
  hot: true,
  stats: {
    colors: true
  }
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:' + port);
});
