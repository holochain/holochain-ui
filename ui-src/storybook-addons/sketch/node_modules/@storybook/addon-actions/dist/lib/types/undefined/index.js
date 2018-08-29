'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = '$___storybook.undefined';

var undefinedType = {
  KEY: KEY,
  is: function is(value) {
    return value === undefined;
  },
  serialize: function serialize() {
    return (0, _defineProperty3.default)({}, KEY, true);
  },
  deserialize: function deserialize() {
    return undefined;
  }
};

exports.default = undefinedType;