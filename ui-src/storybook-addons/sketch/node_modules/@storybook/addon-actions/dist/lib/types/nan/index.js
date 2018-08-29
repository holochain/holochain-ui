'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = '$___storybook.NaN';
var NaNType = {
  KEY: KEY,
  is: function is(value) {
    return typeof value === 'number' && (0, _isNan2.default)(value);
  },
  serialize: function serialize() {
    return (0, _defineProperty3.default)({}, KEY, true);
  },
  deserialize: function deserialize() {
    return NaN;
  }
};

exports.default = NaNType;