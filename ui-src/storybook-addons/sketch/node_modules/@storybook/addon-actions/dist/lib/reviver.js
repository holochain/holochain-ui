'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

function reviver(key, value) {
  if ((0, _util.isObject)(value)) {
    var result = (0, _util.typeReviver)(value);

    if (result) {
      return result.value;
    }
  }

  return value;
}

exports.default = reviver;