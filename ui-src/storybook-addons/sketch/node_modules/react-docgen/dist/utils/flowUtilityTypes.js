'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.isSupportedUtilityType = isSupportedUtilityType;
exports.unwrapUtilityType = unwrapUtilityType;

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = _recast2.default.types.namedTypes; /*
                                                  * Copyright (c) 2015, Facebook, Inc.
                                                  * All rights reserved.
                                                  *
                                                  * This source code is licensed under the BSD-style license found in the
                                                  * LICENSE file in the root directory of this source tree. An additional grant
                                                  * of patent rights can be found in the PATENTS file in the same directory.
                                                  *
                                                  * 
                                                  *
                                                  */

const supportedUtilityTypes = new _set2.default(['$Exact', '$ReadOnly']);

/**
 * See `supportedUtilityTypes` for which types are supported and
 * https://flow.org/en/docs/types/utilities/ for which types are available.
 */
function isSupportedUtilityType(path) {
  if (types.GenericTypeAnnotation.check(path.node)) {
    const idPath = path.get('id');
    return Boolean(idPath) && supportedUtilityTypes.has(idPath.node.name);
  }
  return false;
}

/**
 * Unwraps well known utility types. For example:
 *
 *   $ReadOnly<T> => T
 */
function unwrapUtilityType(path) {
  return path.get('typeParameters', 'params', 0);
}