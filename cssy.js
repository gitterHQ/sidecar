var postcss            = require('postcss');
var postcssPluginStack = require('./postcss-plugin-stack');

module.exports = function(ctx, done) {
  var result = postcss(postcssPluginStack)
    .process(ctx.src, {
      map : { prev : ctx.map } // Preserve source map !
    });

  ctx.src = result.css;
  ctx.map = result.map.toJSON();

  done(null, ctx);
};
