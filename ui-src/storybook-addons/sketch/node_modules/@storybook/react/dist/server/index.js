'use strict';

var _server = require('@storybook/core/server');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _webpack = require('./config/webpack.config');

var _webpack2 = _interopRequireDefault(_webpack);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _server.buildDev)({
  packageJson: _package2.default,
  getBaseConfig: _webpack2.default,
  loadConfig: _config2.default,
  defaultFavIcon: _path2.default.resolve(__dirname, 'public/favicon.ico')
});