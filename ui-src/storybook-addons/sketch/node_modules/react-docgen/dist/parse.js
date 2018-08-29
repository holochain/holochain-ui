'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_MISSING_DEFINITION = undefined;
exports.default = parse;

var _Documentation = require('./Documentation');

var _Documentation2 = _interopRequireDefault(_Documentation);

var _postProcessDocumentation = require('./utils/postProcessDocumentation');

var _postProcessDocumentation2 = _interopRequireDefault(_postProcessDocumentation);

var _babelParser = require('./babelParser');

var _babelParser2 = _interopRequireDefault(_babelParser);

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

const ERROR_MISSING_DEFINITION = 'No suitable component definition found.';

function executeHandlers(handlers, componentDefinitions) {
  return componentDefinitions.map(componentDefinition => {
    const documentation = new _Documentation2.default();
    handlers.forEach(handler => handler(documentation, componentDefinition));
    return (0, _postProcessDocumentation2.default)(documentation.toObject());
  });
}

/**
 * Takes JavaScript source code and returns an object with the information
 * extract from it.
 *
 * `resolver` is a strategy to find the AST node(s) of the component
 * definition(s) inside `src`.
 * It is a function that gets passed the program AST node of
 * the source as first argument, and a reference to recast as second argument.
 *
 * This allows you define your own strategy for finding component definitions.
 *
 * `handlers` is an array of functions which are passed a reference to the
 * component definitions (extracted by `resolver`) so that they can extract
 * information from it. They get also passed a reference to a `Documentation`
 * object to attach the information to.
 *
 * If `resolver` returns an array of component definitions, `parse` will return
 * an array of documentation objects. If `resolver` returns a single node
 * instead, `parse` will return a documentation object.
 */
function parse(src, resolver, handlers, options) {
  const ast = _recast2.default.parse(src, { parser: (0, _babelParser2.default)(options) });
  const componentDefinitions = resolver(ast.program, _recast2.default);

  if (Array.isArray(componentDefinitions)) {
    if (componentDefinitions.length === 0) {
      throw new Error(ERROR_MISSING_DEFINITION);
    }
    return executeHandlers(handlers, componentDefinitions);
  } else if (componentDefinitions) {
    return executeHandlers(handlers, [componentDefinitions])[0];
  }

  throw new Error(ERROR_MISSING_DEFINITION);
}

exports.ERROR_MISSING_DEFINITION = ERROR_MISSING_DEFINITION;