'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMemberExpressionValuePath;

var _getNameOrValue = require('./getNameOrValue');

var _getNameOrValue2 = _interopRequireDefault(_getNameOrValue);

var _expressionTo = require('./expressionTo');

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

function resolveName(path) {
  if (types.VariableDeclaration.check(path.node)) {
    const declarations = path.get('declarations');
    if (declarations.value.length && declarations.value.length !== 1) {
      throw new TypeError('Got unsupported VariableDeclaration. VariableDeclaration must only ' + 'have a single VariableDeclarator. Got ' + declarations.value.length + ' declarations.');
    }
    const value = declarations.get(0, 'id', 'name').value;
    return value;
  }

  if (types.FunctionDeclaration.check(path.node)) {
    return path.get('id', 'name').value;
  }

  if (types.FunctionExpression.check(path.node) || types.ArrowFunctionExpression.check(path.node) || types.TaggedTemplateExpression.check(path.node)) {
    let currentPath = path;
    while (currentPath.parent) {
      if (types.VariableDeclarator.check(currentPath.parent.node)) {
        return currentPath.parent.get('id', 'name').value;
      }

      currentPath = currentPath.parent;
    }

    return;
  }

  throw new TypeError('Attempted to resolveName for an unsupported path. resolveName accepts a ' + 'VariableDeclaration, FunctionDeclaration, or FunctionExpression. Got "' + path.node.type + '".');
}

function getRoot(node) {
  let root = node.parent;
  while (root.parent) {
    root = root.parent;
  }
  return root;
}

function getMemberExpressionValuePath(variableDefinition, memberName) {
  const localName = resolveName(variableDefinition);
  const program = getRoot(variableDefinition);

  if (!localName) {
    // likely an immediately exported and therefore nameless/anonymous node
    // passed in
    return;
  }

  let result;
  _recast2.default.visit(program, {
    visitAssignmentExpression(path) {
      const memberPath = path.get('left');
      if (!types.MemberExpression.check(memberPath.node)) {
        return this.traverse(path);
      }

      if ((!memberPath.node.computed || types.Literal.check(memberPath.node.property)) && (0, _getNameOrValue2.default)(memberPath.get('property')) === memberName && (0, _expressionTo.String)(memberPath.get('object')) === localName) {
        result = path.get('right');
        return false;
      }

      this.traverse(memberPath);
    }
  });

  return result;
}