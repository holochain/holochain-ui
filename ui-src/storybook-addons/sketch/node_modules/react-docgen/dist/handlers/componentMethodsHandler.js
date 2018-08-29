'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = componentMethodsHandler;

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

var _getMemberValuePath = require('../utils/getMemberValuePath');

var _getMemberValuePath2 = _interopRequireDefault(_getMemberValuePath);

var _getMethodDocumentation = require('../utils/getMethodDocumentation');

var _getMethodDocumentation2 = _interopRequireDefault(_getMethodDocumentation);

var _isReactComponentClass = require('../utils/isReactComponentClass');

var _isReactComponentClass2 = _interopRequireDefault(_isReactComponentClass);

var _isReactComponentMethod = require('../utils/isReactComponentMethod');

var _isReactComponentMethod2 = _interopRequireDefault(_isReactComponentMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = _recast2.default.types.namedTypes;

/**
 * The following values/constructs are considered methods:
 *
 * - Method declarations in classes (except "constructor" and React lifecycle
 *   methods
 * - Public class fields in classes whose value are a functions
 * - Object properties whose values are functions
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
 */

function isMethod(path) {
  const isProbablyMethod = types.MethodDefinition.check(path.node) && path.node.kind !== 'constructor' || types.ClassProperty.check(path.node) && types.Function.check(path.get('value').node) || types.Property.check(path.node) && types.Function.check(path.get('value').node);

  return isProbablyMethod && !(0, _isReactComponentMethod2.default)(path);
}

/**
 * Extract all flow types for the methods of a react component. Doesn't
 * return any react specific lifecycle methods.
 */
function componentMethodsHandler(documentation, path) {
  // Extract all methods from the class or object.
  let methodPaths = [];
  if ((0, _isReactComponentClass2.default)(path)) {
    methodPaths = path.get('body', 'body').filter(isMethod);
  } else if (types.ObjectExpression.check(path.node)) {
    methodPaths = path.get('properties').filter(isMethod);

    // Add the statics object properties.
    const statics = (0, _getMemberValuePath2.default)(path, 'statics');
    if (statics) {
      statics.get('properties').each(p => {
        if (isMethod(p)) {
          p.node.static = true;
          methodPaths.push(p);
        }
      });
    }
  }

  documentation.set('methods', methodPaths.map(_getMethodDocumentation2.default));
}