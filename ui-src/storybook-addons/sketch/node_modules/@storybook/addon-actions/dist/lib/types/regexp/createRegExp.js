'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRegExp;
function createRegExp(regExp) {
  var parts = regExp.split('/');

  return new RegExp(parts[1], parts[2]);
}