'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFunction;

var _canConfigureName = require('../../util/canConfigureName');

var _canConfigureName2 = _interopRequireDefault(_canConfigureName);

var _createFunctionEval = require('./createFunctionEval');

var _createFunctionEval2 = _interopRequireDefault(_createFunctionEval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFunction() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (_canConfigureName2.default) {
    var func = function unnamed() {};

    Object.defineProperty(func, 'name', { value: name });

    return func;
  }

  return (0, _createFunctionEval2.default)(name);
}