'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureDepth;
var DEPTH_KEY = exports.DEPTH_KEY = '$___storybook.depthKey';

function configureDepth(obj) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  obj[DEPTH_KEY] = depth; // eslint-disable-line no-param-reassign

  return obj;
}