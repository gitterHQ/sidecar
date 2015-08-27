var path = require('path');

var postcss = require('postcss');
var context = require('postcss-plugin-context');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring');
var nested = require('postcss-nested');

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
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  postcss: function () {
    return [
      nested(),
      context({
        'border-box': postcss.plugin('postcss-border-box', function (opts) {
          opts = opts || {};
          return function(css) {
            css.eachRule(function(rule) {
              var decl = postcss.decl({
                prop: 'box-sizing',
                value: 'border-box'
              });
              rule.prepend(decl);
            });
          };
        })()
      }),
      autoprefixer(),
      csswring()
    ];
  }
};
