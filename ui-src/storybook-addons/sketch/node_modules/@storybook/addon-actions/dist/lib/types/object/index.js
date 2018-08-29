'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _createNamedObject = require('./createNamedObject');

var _createNamedObject2 = _interopRequireDefault(_createNamedObject);

var _getObjectName = require('./getObjectName');

var _getObjectName2 = _interopRequireDefault(_getObjectName);

var _configureDepth2 = require('./configureDepth');

var _configureDepth3 = _interopRequireDefault(_configureDepth2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maxDepth = 2;
var KEY = '$___storybook.objectName';

var objectType = {
  KEY: KEY,
  // is: (value) => , // not used
  serialize: function serialize(value) {
    var objectName = (0, _getObjectName2.default)(value);
    if (objectName === 'Object') {
      return (0, _defineProperty3.default)({}, KEY, objectName);
    }

    return (0, _configureDepth3.default)((0, _defineProperty3.default)({}, KEY, objectName), maxDepth);
  },
  deserialize: function deserialize(value) {
    return (0, _createNamedObject2.default)(value, KEY);
  }
};

exports.default = objectType;