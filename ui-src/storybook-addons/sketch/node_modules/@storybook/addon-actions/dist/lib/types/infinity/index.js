'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _isFinite = require('babel-runtime/core-js/number/is-finite');

var _isFinite2 = _interopRequireDefault(_isFinite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = '$___storybook.Infinity';

var InfinityType = {
  KEY: KEY,
  is: function is(value) {
    return typeof value === 'number' && !(0, _isFinite2.default)(value);
  },
  serialize: function serialize(value) {
    return (0, _defineProperty3.default)({}, KEY, value === Infinity);
  },
  deserialize: function deserialize(value) {
    return value[KEY] ? Infinity : -Infinity;
  }
};

exports.default = InfinityType;