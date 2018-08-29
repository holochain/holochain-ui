'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.types = exports.undefinedType = exports.symbolType = exports.regexpType = exports.nanType = exports.infinityType = exports.functionType = exports.dateType = exports.objectType = undefined;

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _function = require('./function');

var _function2 = _interopRequireDefault(_function);

var _infinity = require('./infinity');

var _infinity2 = _interopRequireDefault(_infinity);

var _nan = require('./nan');

var _nan2 = _interopRequireDefault(_nan);

var _regexp = require('./regexp');

var _regexp2 = _interopRequireDefault(_regexp);

var _symbol = require('./symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _undefined = require('./undefined');

var _undefined2 = _interopRequireDefault(_undefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.objectType = _object2.default;
exports.dateType = _date2.default;
exports.functionType = _function2.default;
exports.infinityType = _infinity2.default;
exports.nanType = _nan2.default;
exports.regexpType = _regexp2.default;
exports.symbolType = _symbol2.default;
exports.undefinedType = _undefined2.default;
var types = exports.types = [_date2.default, _function2.default, _nan2.default, _infinity2.default, _regexp2.default, _symbol2.default, _undefined2.default];