var postcss = require('postcss');
var context = require('postcss-plugin-context');
var atImport = require('postcss-import');
var mixins = require('postcss-mixins');
var simpleVariables = require('postcss-simple-vars');
var writeSvg = require('postcss-write-svg');
var nested = require('postcss-nested');
var cssvariables = require('postcss-css-variables');
var calc = require('postcss-calc');
var reporter = require('postcss-reporter');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring');


var borderBox = postcss.plugin('postcss-border-box', function (opts) {
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
});

module.exports = function() {
  return [
    atImport(),
    mixins(),
    simpleVariables(),
    writeSvg({
      // For IE support
      encoding: 'base64'
    }),
    nested(),
    cssvariables(),
    calc(),
    context({
      'border-box': borderBox
    }),
    autoprefixer(),
    csswring(),
    reporter({
      //clearMessages: true
    })
  ];
};
