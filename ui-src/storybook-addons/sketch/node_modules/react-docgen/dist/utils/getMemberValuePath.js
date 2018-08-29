'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMemberValuePath;

var _getClassMemberValuePath = require('./getClassMemberValuePath');

var _getClassMemberValuePath2 = _interopRequireDefault(_getClassMemberValuePath);

var _getMemberExpressionValuePath = require('./getMemberExpressionValuePath');

var _getMemberExpressionValuePath2 = _interopRequireDefault(_getMemberExpressionValuePath);

var _getPropertyValuePath = require('./getPropertyValuePath');

var _getPropertyValuePath2 = _interopRequireDefault(_getPropertyValuePath);

var _resolveFunctionDefinitionToReturnValue = require('../utils/resolveFunctionDefinitionToReturnValue');

var _resolveFunctionDefinitionToReturnValue2 = _interopRequireDefault(_resolveFunctionDefinitionToReturnValue);

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

const SYNONYMS = {
  getDefaultProps: 'defaultProps',
  defaultProps: 'getDefaultProps'
};

const POSTPROCESS_MEMBERS = {
  propTypes: path => types.Function.check(path.node) ? (0, _resolveFunctionDefinitionToReturnValue2.default)(path) : path
};

const LOOKUP_METHOD = {
  [types.ArrowFunctionExpression.name]: _getMemberExpressionValuePath2.default,
  [types.FunctionExpression.name]: _getMemberExpressionValuePath2.default,
  [types.FunctionDeclaration.name]: _getMemberExpressionValuePath2.default,
  [types.VariableDeclaration.name]: _getMemberExpressionValuePath2.default,
  [types.ObjectExpression.name]: _getPropertyValuePath2.default,
  [types.ClassDeclaration.name]: _getClassMemberValuePath2.default,
  [types.ClassExpression.name]: _getClassMemberValuePath2.default
};

function isSupportedDefinitionType({ node }) {
  return types.ObjectExpression.check(node) || types.ClassDeclaration.check(node) || types.ClassExpression.check(node) ||
  /**
   * Adds support for libraries such as
   * [styled components]{@link https://github.com/styled-components} that use
   * TaggedTemplateExpression's to generate components.
   *
   * While react-docgen's built-in resolvers do not support resolving
   * TaggedTemplateExpression definitiona, third-party resolvers (such as
   * https://github.com/Jmeyering/react-docgen-annotation-resolver) could be
   * used to add these definitions.
   */
  types.TaggedTemplateExpression.check(node) ||
  // potential stateless function component
  types.VariableDeclaration.check(node) || types.ArrowFunctionExpression.check(node) || types.FunctionDeclaration.check(node) || types.FunctionExpression.check(node);
}

/**
 * This is a helper method for handlers to make it easier to work either with
 * an ObjectExpression from `React.createClass` class or with a class
 * definition.
 *
 * Given a path and a name, this function will either return the path of the
 * property value if the path is an ObjectExpression, or the value of the
 * ClassProperty/MethodDefinition if it is a class definition (declaration or
 * expression).
 *
 * It also normalizes the names so that e.g. `defaultProps` and
 * `getDefaultProps` can be used interchangeably.
 */
function getMemberValuePath(componentDefinition, memberName) {
  if (!isSupportedDefinitionType(componentDefinition)) {
    throw new TypeError('Got unsupported definition type. Definition must be one of ' + 'ObjectExpression, ClassDeclaration, ClassExpression,' + 'VariableDeclaration, ArrowFunctionExpression, FunctionExpression, ' + 'TaggedTemplateExpression or FunctionDeclaration. Got "' + componentDefinition.node.type + '"' + 'instead.');
  }

  const lookupMethod = LOOKUP_METHOD[componentDefinition.node.type] || _getMemberExpressionValuePath2.default;
  let result = lookupMethod(componentDefinition, memberName);
  if (!result && SYNONYMS[memberName]) {
    result = lookupMethod(componentDefinition, SYNONYMS[memberName]);
  }
  if (result && POSTPROCESS_MEMBERS[memberName]) {
    result = POSTPROCESS_MEMBERS[memberName](result);
  }

  return result;
}