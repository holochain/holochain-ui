'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = decorateAction;

var _preview = require('../preview');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function decorateAction(decorators) {
  return function (name, options) {
    var callAction = (0, _preview.action)(name, options);
    return function () {
      for (var _len = arguments.length, _args = Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      var decorated = decorators.reduce(function (args, fn) {
        return fn(args);
      }, _args);
      callAction.apply(undefined, (0, _toConsumableArray3.default)(decorated));
    };
  };
}