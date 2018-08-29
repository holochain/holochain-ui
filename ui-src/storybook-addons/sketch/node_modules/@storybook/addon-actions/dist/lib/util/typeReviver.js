'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('../types');

var hasOwnProperty = Object.prototype.hasOwnProperty;


var allTypes = _types.types.concat(_types.objectType);

function typeFilter(value) {
  var found = allTypes.find(function (type) {
    return hasOwnProperty.call(value, type.KEY);
  });

  if (found) {
    return {
      value: found.deserialize(value)
    };
  }

  return false;
}

exports.default = typeFilter;