'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveObjectExpressionToNameArray = resolveObjectExpressionToNameArray;
exports.default = resolveObjectKeysToArray;

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

var _resolveToValue = require('./resolveToValue');

var _resolveToValue2 = _interopRequireDefault(_resolveToValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2017, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 *
 */

var _recast$types = _recast2.default.types;
const ASTNode = _recast$types.ASTNode,
      NodePath = _recast$types.NodePath,
      builders = _recast$types.builders,
      types = _recast$types.namedTypes;


function isObjectKeysCall(node) {
  return types.CallExpression.check(node) && node.arguments.length === 1 && types.MemberExpression.check(node.callee) && types.Identifier.check(node.callee.object) && node.callee.object.name === 'Object' && types.Identifier.check(node.callee.property) && node.callee.property.name === 'keys';
}

function resolveObjectExpressionToNameArray(objectExpression, raw = false) {
  if (types.ObjectExpression.check(objectExpression.value) && objectExpression.value.properties.every(prop => types.Property.check(prop) && (types.Identifier.check(prop.key) && !prop.computed || types.Literal.check(prop.key)) || types.SpreadElement.check(prop))) {
    let values = [];
    let error = false;
    objectExpression.get('properties').each(propPath => {
      if (error) return;
      const prop = propPath.value;

      if (types.Property.check(prop)) {
        // Key is either Identifier or Literal
        const name = prop.key.name || (raw ? prop.key.raw : prop.key.value);

        values.push(name);
      } else if (types.SpreadElement.check(prop)) {
        const spreadObject = (0, _resolveToValue2.default)(propPath.get('argument'));
        const spreadValues = resolveObjectExpressionToNameArray(spreadObject);
        if (!spreadValues) {
          error = true;
          return;
        }
        values = [...values, ...spreadValues];
      }
    });

    if (!error) {
      return values;
    }
  }

  return null;
}

/**
 * Returns an ArrayExpression which contains all the keys resolved from an object
 *
 * Ignores setters in objects
 *
 * Returns null in case of
 *  unresolvable spreads
 *  computed identifier keys
 */
function resolveObjectKeysToArray(path) {
  const node = path.node;

  if (isObjectKeysCall(node)) {
    const objectExpression = (0, _resolveToValue2.default)(path.get('arguments').get(0));
    const values = resolveObjectExpressionToNameArray(objectExpression);

    if (values) {
      const nodes = values.filter((value, index, array) => array.indexOf(value) === index).map(value => builders.literal(value));

      return new NodePath(builders.arrayExpression(nodes));
    }
  }

  return null;
}