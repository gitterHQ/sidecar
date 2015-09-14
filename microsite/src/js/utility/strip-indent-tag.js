import stripIndent from 'strip-indent';

// Tagged template string function
// stripIndent`hello`
export default function (strings, ...values) {
  let string = strings
    .reduce(function(prevResult, str, i) {
      return prevResult + str + (i < values.length ? values[i] : '');
    }, '');

  return stripIndent(string).trim();
}
