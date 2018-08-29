'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultPropsHandler;

var _getPropertyName = require('../utils/getPropertyName');

var _getPropertyName2 = _interopRequireDefault(_getPropertyName);

var _getMemberValuePath = require('../utils/getMemberValuePath');

var _getMemberValuePath2 = _interopRequireDefault(_getMemberValuePath);

var _printValue = require('../utils/printValue');

var _printValue2 = _interopRequireDefault(_printValue);

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

var _resolveToValue = require('../utils/resolveToValue');

var _resolveToValue2 = _interopRequireDefault(_resolveToValue);

var _resolveFunctionDefinitionToReturnValue = require('../utils/resolveFunctionDefinitionToReturnValue');

var _resolveFunctionDefinitionToReturnValue2 = _interopRequireDefault(_resolveFunctionDefinitionToReturnValue);

var _isStatelessComponent = require('../utils/isStatelessComponent');

var _isStatelessComponent2 = _interopRequireDefault(_isStatelessComponent);

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


function getDefaultValue(path) {
  let node = path.node;
  let defaultValue;
  if (types.Literal.check(node)) {
    defaultValue = node.raw;
  } else {
    if (types.AssignmentPattern.check(path.node)) {
      path = (0, _resolveToValue2.default)(path.get('right'));
    } else {
      path = (0, _resolveToValue2.default)(path);
    }
    if (types.ImportDeclaration.check(path.node)) {
      defaultValue = node.name;
    } else {
      node = path.node;
      defaultValue = (0, _printValue2.default)(path);
    }
  }
  if (typeof defaultValue !== 'undefined') {
    return {
      value: defaultValue,
      computed: types.CallExpression.check(node) || types.MemberExpression.check(node) || types.Identifier.check(node)
    };
  }

  return null;
}

function getStatelessPropsPath(componentDefinition) {
  return (0, _resolveToValue2.default)(componentDefinition).get('params', 0);
}

function getDefaultPropsPath(componentDefinition) {
  let defaultPropsPath = (0, _getMemberValuePath2.default)(componentDefinition, 'defaultProps');
  if (!defaultPropsPath) {
    return null;
  }

  defaultPropsPath = (0, _resolveToValue2.default)(defaultPropsPath);
  if (!defaultPropsPath) {
    return null;
  }

  if (types.FunctionExpression.check(defaultPropsPath.node)) {
    // Find the value that is returned from the function and process it if it is
    // an object literal.
    const returnValue = (0, _resolveFunctionDefinitionToReturnValue2.default)(defaultPropsPath);
    if (returnValue && types.ObjectExpression.check(returnValue.node)) {
      defaultPropsPath = returnValue;
    }
  }
  return defaultPropsPath;
}

function getDefaultValuesFromProps(properties, documentation, isStateless) {
  properties.filter(propertyPath => types.Property.check(propertyPath.node))
  // Don't evaluate property if component is functional and the node is not an AssignmentPattern
  .filter(propertyPath => !isStateless || types.AssignmentPattern.check(propertyPath.get('value').node)).forEach(function (propertyPath) {
    const propDescriptor = documentation.getPropDescriptor((0, _getPropertyName2.default)(propertyPath));
    const defaultValue = getDefaultValue(isStateless ? propertyPath.get('value', 'right') : propertyPath.get('value'));
    if (defaultValue) {
      propDescriptor.defaultValue = defaultValue;
    }
  });
}

function defaultPropsHandler(documentation, componentDefinition) {
  let statelessProps = null;
  const defaultPropsPath = getDefaultPropsPath(componentDefinition);
  if ((0, _isStatelessComponent2.default)(componentDefinition)) {
    statelessProps = getStatelessPropsPath(componentDefinition);
  }

  // Do both statelessProps and defaultProps if both are available so defaultProps can override
  if (statelessProps && types.ObjectPattern.check(statelessProps.node)) {
    getDefaultValuesFromProps(statelessProps.get('properties'), documentation, true);
  }
  if (defaultPropsPath && types.ObjectExpression.check(defaultPropsPath.node)) {
    getDefaultValuesFromProps(defaultPropsPath.get('properties'), documentation, false);
  }
}