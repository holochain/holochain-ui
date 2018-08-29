"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

exports.configureActions = configureActions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = exports.config = {
  depth: 10
};

function configureActions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _assign2.default)(config, options);
}