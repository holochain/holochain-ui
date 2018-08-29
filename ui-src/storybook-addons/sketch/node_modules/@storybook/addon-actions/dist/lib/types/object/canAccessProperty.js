"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = canAccessProperty;
function canAccessProperty(key, value) {
  var prop = void 0;

  try {
    prop = value[key];
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  return !!prop;
}