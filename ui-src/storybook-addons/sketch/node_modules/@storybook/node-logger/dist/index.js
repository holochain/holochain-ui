'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = undefined;

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = exports.logger = {
  info: function info(message) {
    return _npmlog2.default.info('', message);
  },
  warn: function warn(message) {
    return _npmlog2.default.warn('', message);
  },
  error: function error(message) {
    return _npmlog2.default.error('', message);
  }
};