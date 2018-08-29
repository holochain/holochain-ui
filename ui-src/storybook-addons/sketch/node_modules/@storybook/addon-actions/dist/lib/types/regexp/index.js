'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _createRegExp = require('./createRegExp');

var _createRegExp2 = _interopRequireDefault(_createRegExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = '$___storybook.regExpKey';

var regExpType = {
  KEY: KEY,
  is: function is(value) {
    return value instanceof RegExp;
  },
  serialize: function serialize(value) {
    return (0, _defineProperty3.default)({}, KEY, value.toString());
  },
  deserialize: function deserialize(value) {
    return (0, _createRegExp2.default)(value[KEY]);
  }
};

exports.default = regExpType;