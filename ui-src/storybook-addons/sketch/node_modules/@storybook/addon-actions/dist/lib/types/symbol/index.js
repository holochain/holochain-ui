'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _createSymbol = require('./createSymbol');

var _createSymbol2 = _interopRequireDefault(_createSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = '$___storybook.symbolName';

var symbolType = {
  KEY: KEY,
  is: function is(value) {
    return (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'symbol';
  },
  serialize: function serialize(value) {
    return (0, _defineProperty3.default)({}, KEY, String(value).slice(7, -1) || null);
  },
  deserialize: function deserialize(value) {
    return (0, _createSymbol2.default)(value[KEY]);
  }
};

exports.default = symbolType;