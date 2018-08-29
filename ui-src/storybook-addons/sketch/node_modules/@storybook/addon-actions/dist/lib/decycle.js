'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

exports.default = decycle;

var _errors = require('./errors');

var _util = require('./util');

var _ = require('./');

var _types = require('./types');

var _configureDepth = require('./types/object/configureDepth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;
function decycle(object) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var objects = new _weakMap2.default();

  var isCyclic = false;

  var res = function derez(value, path, _depth, _branchDepthMax) {
    var oldPath = void 0;
    var obj = void 0;

    var maxDepth = _branchDepthMax;

    var result = (0, _util.typeReplacer)(value);

    if (result) {
      return result.value;
    }

    var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);

    if (value instanceof Boolean || value instanceof Number || value instanceof String) {
      return value;
    }

    if (type === 'object' && value !== null) {
      oldPath = objects.get(value);
      if (oldPath !== undefined) {
        isCyclic = true;

        return { $ref: oldPath };
      }

      try {
        objects.set(value, path);
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
        return new _errors.DecycleError(error.message);
      }

      if (Array.isArray(value)) {
        obj = [];
        for (var i = 0; i < value.length; i += 1) {
          obj[i] = derez(value[i], path + '[' + i + ']', _depth + 1, maxDepth);
        }
      } else {
        obj = _types.objectType.serialize(value);

        var newDepth = void 0;
        if (hasOwnProperty.call(obj, _configureDepth.DEPTH_KEY)) {
          if (_depth + 1 < maxDepth) {
            var depthKey = obj[_configureDepth.DEPTH_KEY];

            newDepth = depthKey === 0 ? 0 : _depth + depthKey;
            maxDepth = newDepth >= depth ? depth : newDepth;
          }

          delete obj[_configureDepth.DEPTH_KEY];
        }

        if (_depth <= maxDepth) {
          (0, _util.getPropertiesList)(value).forEach(function (name) {
            if (!(0, _util.omitProperty)(name)) {
              try {
                obj[name] = derez(value[name], path + '[' + (0, _stringify2.default)(name) + ']', _depth + 1, maxDepth);
              } catch (error) {
                console.error(error); // eslint-disable-line no-console
                obj[name] = new _errors.DecycleError(error.message);
              }
            }
          });
        }
      }

      if (_depth === 0 && value instanceof Object && isCyclic) {
        obj[_.CYCLIC_KEY] = true;
      }

      return obj;
    }

    return value;
  }(object, '$', 0, depth);

  return res;
}