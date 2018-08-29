'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _createBoundFunction = require('./createBoundFunction');

var _createBoundFunction2 = _interopRequireDefault(_createBoundFunction);

var _createFunction = require('./createFunction');

var _createFunction2 = _interopRequireDefault(_createFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = '$___storybook.functionName';

var functionType = {
  KEY: KEY,
  is: function is(value) {
    return typeof value === 'function';
  },
  serialize: function serialize(value) {
    return (0, _defineProperty3.default)({}, KEY, value.name || '');
  },
  deserialize: function deserialize(value) {
    var parts = value[KEY].split(' ');

    return parts.length === 2 && parts[0] === 'bound' ? (0, _createBoundFunction2.default)(parts[1]) : (0, _createFunction2.default)(parts[0]);
  }
};

exports.default = functionType;