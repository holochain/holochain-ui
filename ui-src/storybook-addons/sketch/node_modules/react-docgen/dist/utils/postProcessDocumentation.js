'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = function (documentation) {
  const props = documentation.props;

  if (props) {
    postProcessProps(props);
  }

  return documentation;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function postProcessProps(props) {
  // props with default values should not be required
  (0, _keys2.default)(props).forEach(prop => {
    const propInfo = props[prop];

    if (propInfo.defaultValue) {
      propInfo.required = false;
    }
  });
} /*
   * Copyright (c) 2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * 
   */