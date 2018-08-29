'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
var toString = Object.prototype.toString;
function isObject(value) {
  return toString.call(value) === '[object Object]';
}