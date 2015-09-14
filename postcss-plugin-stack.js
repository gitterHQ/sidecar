var postcss = require('postcss');
var context = require('postcss-plugin-context');
var atImport = require('postcss-import');
var simpleVariables = require('postcss-simple-vars');
var mixins = require('postcss-mixins');
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
