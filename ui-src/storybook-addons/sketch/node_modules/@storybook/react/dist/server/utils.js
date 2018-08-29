'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreviewHeadHtml = getPreviewHeadHtml;
exports.getManagerHeadHtml = getManagerHeadHtml;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utilDeprecate = require('util-deprecate');

var _utilDeprecate2 = _interopRequireDefault(_utilDeprecate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fallbackHeadUsage = (0, _utilDeprecate2.default)(function () {}, 'Usage of head.html has been deprecated. Please rename head.html to preview-head.html');

function getPreviewHeadHtml(configDirPath) {
  var headHtmlPath = _path2.default.resolve(configDirPath, 'preview-head.html');
  var fallbackHtmlPath = _path2.default.resolve(configDirPath, 'head.html');
  var headHtml = '';
  if (_fs2.default.existsSync(headHtmlPath)) {
    headHtml = _fs2.default.readFileSync(headHtmlPath, 'utf8');
  } else if (_fs2.default.existsSync(fallbackHtmlPath)) {
    headHtml = _fs2.default.readFileSync(fallbackHtmlPath, 'utf8');
    fallbackHeadUsage();
  }

  return headHtml;
}

function getManagerHeadHtml(configDirPath) {
  var scriptPath = _path2.default.resolve(configDirPath, 'manager-head.html');
  var scriptHtml = '';
  if (_fs2.default.existsSync(scriptPath)) {
    scriptHtml = _fs2.default.readFileSync(scriptPath, 'utf8');
  }

  return scriptHtml;
}