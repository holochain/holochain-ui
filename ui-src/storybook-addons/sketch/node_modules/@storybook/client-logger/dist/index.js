"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _global = global,
    console = _global.console;
var logger = exports.logger = {
  info: function info(message) {
    return console.log(message);
  },
  warn: function warn(message) {
    return console.warn(message);
  },
  error: function error(message) {
    return console.error(message);
  }
};