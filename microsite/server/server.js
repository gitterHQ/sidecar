
/* * /
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';

import generateRenderResponse from './generate-render-response';


const app = express();
const port = 3000;
const staticPath =  path.join(__dirname, '../dist/');

console.log(`Serving on port ${port}, ${staticPath}`);
// Use this middleware to serve up static files built into the dist directory
app.use(serveStatic(staticPath));


// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  generateRenderResponse(req).then((page) => {
    // Send the rendered page back to the client
    res.send(page);
  });
}

// This is fired every time the server side receives a request
app.use(handleRender);

app.listen(port);
/* * /



/* */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config';

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
/* */
