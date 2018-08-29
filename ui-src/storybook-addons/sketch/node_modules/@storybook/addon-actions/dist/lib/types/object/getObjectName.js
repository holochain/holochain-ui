'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getObjectName;

var _canAccessProperty = require('./canAccessProperty');

var _canAccessProperty2 = _interopRequireDefault(_canAccessProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getObjectName(value) {
  if ((0, _canAccessProperty2.default)('toString', value)) {
    var stringValue = value.toString();

    if (stringValue.slice(0, 5) === 'class') {
      return stringValue.slice(6, -3);
    }

    var type = stringValue.slice(8, -1);

    if (stringValue.slice(1, 7) === 'object' && type !== 'Object') {
      return type;
    }

    var parts = stringValue.match(/function (\w+).*/);

    if (parts && parts.length === 2) {
      return parts[1];
    }
  }

  return value.constructor ? value.constructor.name : 'Object';
}