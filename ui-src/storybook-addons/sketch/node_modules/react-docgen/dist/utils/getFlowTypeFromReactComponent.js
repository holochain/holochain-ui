'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyToFlowTypeProperties = applyToFlowTypeProperties;

var _getTypeAnnotation = require('../utils/getTypeAnnotation');

var _getTypeAnnotation2 = _interopRequireDefault(_getTypeAnnotation);

var _getMemberValuePath = require('../utils/getMemberValuePath');

var _getMemberValuePath2 = _interopRequireDefault(_getMemberValuePath);

var _isReactComponentClass = require('../utils/isReactComponentClass');

var _isReactComponentClass2 = _interopRequireDefault(_isReactComponentClass);

var _isStatelessComponent = require('../utils/isStatelessComponent');

var _isStatelessComponent2 = _interopRequireDefault(_isStatelessComponent);

var _isUnreachableFlowType = require('../utils/isUnreachableFlowType');

var _isUnreachableFlowType2 = _interopRequireDefault(_isUnreachableFlowType);

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

var _resolveToValue = require('../utils/resolveToValue');

var _resolveToValue2 = _interopRequireDefault(_resolveToValue);

var _flowUtilityTypes = require('../utils/flowUtilityTypes');

var _resolveGenericTypeAnnotation = require('../utils/resolveGenericTypeAnnotation');

var _resolveGenericTypeAnnotation2 = _interopRequireDefault(_resolveGenericTypeAnnotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = _recast2.default.types.namedTypes;

/**
 * Given an React component (stateless or class) tries to find the
 * flow type for the props. If not found or not one of the supported
 * component types returns null.
 */
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

exports.default = path => {
  let typePath;

  if ((0, _isReactComponentClass2.default)(path)) {
    const superTypes = path.get('superTypeParameters');

    if (superTypes.value) {
      const params = superTypes.get('params');
      if (params.value.length === 3) {
        typePath = params.get(1);
      } else {
        typePath = params.get(0);
      }
    } else {
      const propsMemberPath = (0, _getMemberValuePath2.default)(path, 'props');
      if (!propsMemberPath) {
        return null;
      }

      typePath = (0, _getTypeAnnotation2.default)(propsMemberPath.parentPath);
    }
  } else if ((0, _isStatelessComponent2.default)(path)) {
    const param = path.get('params').get(0);

    typePath = (0, _getTypeAnnotation2.default)(param);
  }

  if (typePath && (0, _flowUtilityTypes.isSupportedUtilityType)(typePath)) {
    typePath = (0, _flowUtilityTypes.unwrapUtilityType)(typePath);
  } else if (typePath && types.GenericTypeAnnotation.check(typePath.node)) {
    typePath = (0, _resolveToValue2.default)(typePath.get('id'));
    if (!typePath || types.Identifier.check(typePath.node) || (0, _isUnreachableFlowType2.default)(typePath)) {
      return;
    }

    typePath = typePath.get('right');
  }

  return typePath;
};

function applyToFlowTypeProperties(path, callback) {
  if (path.node.properties) {
    path.get('properties').each(propertyPath => callback(propertyPath));
  } else if (path.node.type === 'IntersectionTypeAnnotation') {
    path.get('types').each(typesPath => applyToFlowTypeProperties(typesPath, callback));
  } else if (path.node.type !== 'UnionTypeAnnotation') {
    // The react-docgen output format does not currently allow
    // for the expression of union types
    const typePath = (0, _resolveGenericTypeAnnotation2.default)(path);
    if (typePath) {
      applyToFlowTypeProperties(typePath, callback);
    }
  }
}