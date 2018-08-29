'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.parseList = parseList;
exports.getEnvConfig = getEnvConfig;
exports.getMiddleware = getMiddleware;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseList(str) {
  return str.split(',');
}

function getEnvConfig(program, configEnv) {
  (0, _keys2.default)(configEnv).forEach(function (fieldName) {
    var envVarName = configEnv[fieldName];
    var envVarValue = process.env[envVarName];
    if (envVarValue) {
      program[fieldName] = envVarValue; // eslint-disable-line
    }
  });
}

function getMiddleware(configDir) {
  var middlewarePath = _path2.default.resolve(configDir, 'middleware.js');
  if (_fs2.default.existsSync(middlewarePath)) {
    var middlewareModule = require(middlewarePath); // eslint-disable-line
    if (middlewareModule.__esModule) {
      // eslint-disable-line
      middlewareModule = middlewareModule.default;
    }
    return middlewareModule;
  }
  return function () {};
}