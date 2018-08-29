'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isReserved;

var _reservedKeywords = require('./reservedKeywords');

var _reservedKeywords2 = _interopRequireDefault(_reservedKeywords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isReserved(name) {
  return _reservedKeywords2.default.indexOf(name) >= 0;
}