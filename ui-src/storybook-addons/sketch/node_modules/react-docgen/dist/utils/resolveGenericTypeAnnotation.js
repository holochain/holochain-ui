'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveGenericTypeAnnotation;

var _isUnreachableFlowType = require('../utils/isUnreachableFlowType');

var _isUnreachableFlowType2 = _interopRequireDefault(_isUnreachableFlowType);

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

var _resolveToValue = require('../utils/resolveToValue');

var _resolveToValue2 = _interopRequireDefault(_resolveToValue);

var _flowUtilityTypes = require('./flowUtilityTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
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

const types = _recast2.default.types.namedTypes;

/**
 * Given an React component (stateless or class) tries to find the
 * flow type for the props. If not found or not one of the supported
 * component types returns null.
 */

function resolveGenericTypeAnnotation(path) {
  // If the node doesn't have types or properties, try to get the type.
  let typePath;
  if (path && (0, _flowUtilityTypes.isSupportedUtilityType)(path)) {
    typePath = (0, _flowUtilityTypes.unwrapUtilityType)(path);
  } else if (path && types.GenericTypeAnnotation.check(path.node)) {
    typePath = (0, _resolveToValue2.default)(path.get('id'));
    if ((0, _isUnreachableFlowType2.default)(typePath)) {
      return;
    }

    typePath = typePath.get('right');
  }

  return typePath;
}