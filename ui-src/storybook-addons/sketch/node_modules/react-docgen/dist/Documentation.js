'use strict';

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 *  
 *
 */

class Documentation {

  constructor() {
    this._props = new _map2.default();
    this._context = new _map2.default();
    this._childContext = new _map2.default();
    this._composes = new _set2.default();
    this._data = new _map2.default();
  }

  addComposes(moduleName) {
    this._composes.add(moduleName);
  }

  set(key, value) {
    this._data.set(key, value);
  }

  get(key) {
    return this._data.get(key);
  }

  getPropDescriptor(propName) {
    let propDescriptor = this._props.get(propName);
    if (!propDescriptor) {
      this._props.set(propName, propDescriptor = {});
    }
    return propDescriptor;
  }

  getContextDescriptor(propName) {
    let propDescriptor = this._context.get(propName);
    if (!propDescriptor) {
      this._context.set(propName, propDescriptor = {});
    }
    return propDescriptor;
  }

  getChildContextDescriptor(propName) {
    let propDescriptor = this._childContext.get(propName);
    if (!propDescriptor) {
      this._childContext.set(propName, propDescriptor = {});
    }
    return propDescriptor;
  }

  toObject() {
    const obj = {};

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(this._data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const _ref = _step.value;

        var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

        const key = _ref2[0];
        const value = _ref2[1];

        obj[key] = value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (this._props.size > 0) {
      obj.props = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this._props), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          const _ref3 = _step2.value;

          var _ref4 = (0, _slicedToArray3.default)(_ref3, 2);

          const propName = _ref4[0];
          const propDescriptor = _ref4[1];

          if ((0, _keys2.default)(propDescriptor).length > 0) {
            obj.props[propName] = propDescriptor;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    if (this._context.size > 0) {
      obj.context = {};
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(this._context), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          const _ref5 = _step3.value;

          var _ref6 = (0, _slicedToArray3.default)(_ref5, 2);

          const contextName = _ref6[0];
          const contextDescriptor = _ref6[1];

          if ((0, _keys2.default)(contextDescriptor).length > 0) {
            obj.context[contextName] = contextDescriptor;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    if (this._childContext.size > 0) {
      obj.childContext = {};
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator3.default)(this._childContext), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          const _ref7 = _step4.value;

          var _ref8 = (0, _slicedToArray3.default)(_ref7, 2);

          const childContextName = _ref8[0];
          const childContextDescriptor = _ref8[1];

          obj.childContext[childContextName] = childContextDescriptor;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }

    if (this._composes.size > 0) {
      obj.composes = (0, _from2.default)(this._composes);
    }
    return obj;
  }
}

module.exports = Documentation;