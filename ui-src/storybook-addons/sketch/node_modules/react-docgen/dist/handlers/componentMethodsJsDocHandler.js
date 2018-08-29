'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = componentMethodsJsDocHandler;

var _parseJsDoc = require('../utils/parseJsDoc');

var _parseJsDoc2 = _interopRequireDefault(_parseJsDoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Merges two objects ignoring null/undefined.
function merge(obj1, obj2) {
  if (obj1 == null && obj2 == null) {
    return null;
  }
  const merged = (0, _extends3.default)({}, obj1);
  for (const prop in obj2) {
    if (obj2[prop] != null) {
      merged[prop] = obj2[prop];
    }
  }
  return merged;
}
/**
 * Extract info from the methods jsdoc blocks. Must be run after
 * flowComponentMethodsHandler.
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

function componentMethodsJsDocHandler(documentation) {
  let methods = documentation.get('methods');
  if (!methods) {
    return;
  }

  methods = methods.map(method => {
    if (!method.docblock) {
      return method;
    }

    const jsDoc = (0, _parseJsDoc2.default)(method.docblock);

    const returns = merge(jsDoc.returns, method.returns);
    const params = method.params.map(param => {
      const jsDocParam = jsDoc.params.find(p => p.name === param.name);
      return merge(jsDocParam, param);
    });

    return (0, _extends3.default)({}, method, {
      description: jsDoc.description || null,
      returns,
      params
    });
  });

  documentation.set('methods', methods);
}