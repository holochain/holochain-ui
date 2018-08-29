'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveFunctionDefinitionToReturnValue;

var _resolveToValue = require('./resolveToValue');

var _resolveToValue2 = _interopRequireDefault(_resolveToValue);

var _traverse = require('./traverse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function resolveFunctionDefinitionToReturnValue(path) {
  let returnPath = null;

  (0, _traverse.traverseShallow)(path.get('body'), {
    visitFunction: () => false,
    visitReturnStatement: nodePath => {
      returnPath = (0, _resolveToValue2.default)(nodePath.get('argument'));
      return false;
    }
  });

  return returnPath;
}