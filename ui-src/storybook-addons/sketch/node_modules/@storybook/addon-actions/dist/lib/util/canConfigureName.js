'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// IE11 may return an undefined descriptor, but it supports Function#name
var func = function unnamed() {};
var nameDescriptor = (0, _getOwnPropertyDescriptor2.default)(func, 'name');
// This condition is true in modern browsers that implement Function#name properly
var canConfigureName = !nameDescriptor || nameDescriptor.configurable;

exports.default = canConfigureName;