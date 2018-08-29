'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = retrocycle;

var _reviver = require('./reviver');

var _reviver2 = _interopRequireDefault(_reviver);

var _util = require('./util');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-control-regex
var pathReg = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\([\\"/bfnrt]|u[0-9a-zA-Z]{4}))*")])*$/;

function retrocycle(json) {
  var $ = JSON.parse(json, _reviver2.default);

  if ((typeof $ === 'undefined' ? 'undefined' : (0, _typeof3.default)($)) !== 'object' || $ === null) {
    return $;
  }

  (function rez(value) {
    if (value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
      if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i += 1) {
          var item = value[i];
          if (item && (typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) === 'object') {
            var path = item.$ref;
            if (typeof path === 'string' && pathReg.test(path)) {
              value[i] = eval(path); // eslint-disable-line no-eval, no-param-reassign
            } else {
              rez(item);
            }
          }
        }
      } else {
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (var name in value) {
          var _item = value[name];

          if ((typeof _item === 'undefined' ? 'undefined' : (0, _typeof3.default)(_item)) === 'object' && _item !== null) {
            var _path = _item.$ref;

            if (typeof _path === 'string' && pathReg.test(_path)) {
              value[name] = eval(_path); // eslint-disable-line no-eval, no-param-reassign
            } else {
              rez(_item);
            }
          }
        }
      }
    }
  })($);

  (0, _util.muteProperty)(_.CYCLIC_KEY, $);

  return $;
}