'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flowTypeHandler;

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

var _getFlowType = require('../utils/getFlowType');

var _getFlowType2 = _interopRequireDefault(_getFlowType);

var _getPropertyName = require('../utils/getPropertyName');

var _getPropertyName2 = _interopRequireDefault(_getPropertyName);

var _getFlowTypeFromReactComponent = require('../utils/getFlowTypeFromReactComponent');

var _getFlowTypeFromReactComponent2 = _interopRequireDefault(_getFlowTypeFromReactComponent);

var _resolveToValue = require('../utils/resolveToValue');

var _resolveToValue2 = _interopRequireDefault(_resolveToValue);

var _setPropDescription = require('../utils/setPropDescription');

var _setPropDescription2 = _interopRequireDefault(_setPropDescription);

var _flowUtilityTypes = require('../utils/flowUtilityTypes');

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

function setPropDescriptor(documentation, path) {
  if (types.ObjectTypeSpreadProperty.check(path.node)) {
    let argument = path.get('argument');
    while ((0, _flowUtilityTypes.isSupportedUtilityType)(argument)) {
      argument = (0, _flowUtilityTypes.unwrapUtilityType)(argument);
    }

    if (types.ObjectTypeAnnotation.check(argument.node)) {
      (0, _getFlowTypeFromReactComponent.applyToFlowTypeProperties)(argument, propertyPath => {
        setPropDescriptor(documentation, propertyPath);
      });
      return;
    }

    const name = argument.get('id').get('name');
    const resolvedPath = (0, _resolveToValue2.default)(name);

    if (resolvedPath && types.TypeAlias.check(resolvedPath.node)) {
      const right = resolvedPath.get('right');
      (0, _getFlowTypeFromReactComponent.applyToFlowTypeProperties)(right, propertyPath => {
        setPropDescriptor(documentation, propertyPath);
      });
    } else {
      documentation.addComposes(name.node.name);
    }
  } else if (types.ObjectTypeProperty.check(path.node)) {
    const type = (0, _getFlowType2.default)(path.get('value'));
    const propDescriptor = documentation.getPropDescriptor((0, _getPropertyName2.default)(path));
    propDescriptor.required = !path.node.optional;
    propDescriptor.flowType = type;

    // We are doing this here instead of in a different handler
    // to not need to duplicate the logic for checking for
    // imported types that are spread in to props.
    (0, _setPropDescription2.default)(documentation, path);
  }
}

/**
 * This handler tries to find flow Type annotated react components and extract
 * its types to the documentation. It also extracts docblock comments which are
 * inlined in the type definition.
 */
function flowTypeHandler(documentation, path) {
  const flowTypesPath = (0, _getFlowTypeFromReactComponent2.default)(path);

  if (!flowTypesPath) {
    return;
  }

  (0, _getFlowTypeFromReactComponent.applyToFlowTypeProperties)(flowTypesPath, propertyPath => {
    setPropDescriptor(documentation, propertyPath);
  });
}