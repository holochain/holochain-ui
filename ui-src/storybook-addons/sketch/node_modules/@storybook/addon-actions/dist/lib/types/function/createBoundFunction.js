'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createBoundFunction;

var _createFunction = require('./createFunction');

var _createFunction2 = _interopRequireDefault(_createFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createBoundFunction(name) {
  return (0, _createFunction2.default)(name).bind({});
}