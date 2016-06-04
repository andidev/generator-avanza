'use strict';
var _ = require('lodash');

module.exports = {
  replaceSwedishCharactersWithEnglish: replaceSwedishCharactersWithEnglish,
  kebabCase: kebabCase,
  camelCase: camelCase,
  upperCamelCase: upperCamelCase
};

function replaceSwedishCharactersWithEnglish(text) {
  return _.deburr(text);
}
function kebabCase(text) {
  return _.kebabCase(text);
}
function camelCase(text) {
  return _.camelCase(text);
}
function upperCamelCase(text) {
  return _.upperFirst(_.camelCase(text));
}
