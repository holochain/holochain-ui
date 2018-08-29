'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _makeError = require('make-error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DecycleError = function (_BaseError) {
  (0, _inherits3.default)(DecycleError, _BaseError);

  function DecycleError() {
    (0, _classCallCheck3.default)(this, DecycleError);
    return (0, _possibleConstructorReturn3.default)(this, (DecycleError.__proto__ || (0, _getPrototypeOf2.default)(DecycleError)).apply(this, arguments));
  }

  return DecycleError;
}(_makeError.BaseError);

exports.default = DecycleError;