'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('../types');

function typeReplacer(value) {
  var found = _types.types.find(function (type) {
    return type.is(value);
  });

  if (found) {
    return {
      value: found.serialize(value)
    };
  }

  return false;
}

exports.default = typeReplacer;