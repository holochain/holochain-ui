"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = createSymbol;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSymbol(name) {
  return (0, _symbol2.default)(name);
}