'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPropertiesList;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function getPropertiesList(value) {
  var keys = [];

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (var name in value) {
    try {
      if (hasOwnProperty.call(value, name) || typeof value[name] !== 'function') {
        keys.push(name);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error accessing property ' + name, error);
    }
  }

  return keys;
}