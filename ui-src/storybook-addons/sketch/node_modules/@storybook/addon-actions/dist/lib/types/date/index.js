'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = '$___storybook.Date';

var dateType = {
  KEY: KEY,
  is: function is(value) {
    return value instanceof Date;
  },
  serialize: function serialize(value) {
    return (0, _defineProperty3.default)({}, KEY, value.toISOString());
  },
  deserialize: function deserialize(value) {
    return new Date(value[KEY]);
  }
};

exports.default = dateType;