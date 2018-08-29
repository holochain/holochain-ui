'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = createNamedObject;

var _createFunction = require('../function/createFunction');

var _createFunction2 = _interopRequireDefault(_createFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createNamedObject(obj, key) {
  var Func = (0, _createFunction2.default)(obj[key]);
  var namedObj = new Func();

  delete obj[key]; // eslint-disable-line no-param-reassign

  (0, _assign2.default)(namedObj, obj);

  return namedObj;
}