'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMethodDocumentation;

var _docblock = require('./docblock');

var _getFlowType = require('./getFlowType');

var _getFlowType2 = _interopRequireDefault(_getFlowType);

var _getParameterName = require('./getParameterName');

var _getParameterName2 = _interopRequireDefault(_getParameterName);

var _getPropertyName = require('./getPropertyName');

var _getPropertyName2 = _interopRequireDefault(_getPropertyName);

var _getTypeAnnotation = require('./getTypeAnnotation');

var _getTypeAnnotation2 = _interopRequireDefault(_getTypeAnnotation);

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

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
 */

const types = _recast2.default.types.namedTypes;


function getMethodParamsDoc(methodPath) {
  const params = [];
  const functionExpression = methodPath.get('value');

  // Extract param flow types.
  functionExpression.get('params').each(paramPath => {
    let type = null;
    const typePath = (0, _getTypeAnnotation2.default)(paramPath);
    if (typePath) {
      type = (0, _getFlowType2.default)(typePath);
      if (types.GenericTypeAnnotation.check(typePath.node)) {
        type.alias = typePath.node.id.name;
      }
    }

    const param = {
      name: (0, _getParameterName2.default)(paramPath),
      optional: paramPath.node.optional,
      type
    };

    params.push(param);
  });

  return params;
}

// Extract flow return type.
function getMethodReturnDoc(methodPath) {
  const functionExpression = methodPath.get('value');

  if (functionExpression.node.returnType) {
    const returnType = (0, _getTypeAnnotation2.default)(functionExpression.get('returnType'));
    if (returnType) {
      return { type: (0, _getFlowType2.default)(returnType) };
    }
  }

  return null;
}

function getMethodModifiers(methodPath) {
  const modifiers = [];

  if (methodPath.node.static) {
    modifiers.push('static');
  }

  if (methodPath.node.kind === 'get' || methodPath.node.kind === 'set') {
    modifiers.push(methodPath.node.kind);
  }

  const functionExpression = methodPath.get('value').node;
  if (functionExpression.generator) {
    modifiers.push('generator');
  }
  if (functionExpression.async) {
    modifiers.push('async');
  }

  return modifiers;
}

function getMethodDocumentation(methodPath) {
  const name = (0, _getPropertyName2.default)(methodPath);
  const docblock = (0, _docblock.getDocblock)(methodPath);

  return {
    name,
    docblock,
    modifiers: getMethodModifiers(methodPath),
    params: getMethodParamsDoc(methodPath),
    returns: getMethodReturnDoc(methodPath)
  };
}