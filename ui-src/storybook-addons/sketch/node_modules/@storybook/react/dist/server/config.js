'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function (configType, baseConfig, configDir) {
  var config = baseConfig;

  var babelConfig = (0, _babel_config2.default)(configDir);
  config.module.rules[0].query = (0, _extends3.default)({
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables a cache directory for faster-rebuilds
    // `find-cache-dir` will create the cache directory under the node_modules directory.
    cacheDirectory: (0, _findCacheDir2.default)({ name: 'react-storybook' })
  }, babelConfig);

  // Check whether a config.js file exists inside the storybook
  // config directory and throw an error if it's not.
  var storybookConfigPath = _path2.default.resolve(configDir, 'config.js');
  if (!_fs2.default.existsSync(storybookConfigPath)) {
    var err = new Error('=> Create a storybook config file in "' + configDir + '/config.js".');
    throw err;
  }
  config.entry.preview.push(require.resolve(storybookConfigPath));

  // Check whether addons.js file exists inside the storybook.
  // Load the default addons.js file if it's missing.
  // Insert it after polyfills.js, but before client/manager.
  var storybookDefaultAddonsPath = _path2.default.resolve(__dirname, 'addons.js');
  var storybookCustomAddonsPath = _path2.default.resolve(configDir, 'addons.js');
  if (_fs2.default.existsSync(storybookCustomAddonsPath)) {
    _nodeLogger.logger.info('=> Loading custom addons config.');
    config.entry.manager.splice(1, 0, storybookCustomAddonsPath);
  } else {
    config.entry.manager.splice(1, 0, storybookDefaultAddonsPath);
  }

  var defaultConfig = (0, _server.createDefaultWebpackConfig)(config);

  // Check whether user has a custom webpack config file and
  // return the (extended) base configuration if it's not available.
  var customConfigPath = _path2.default.resolve(configDir, 'webpack.config.js');

  if (!_fs2.default.existsSync(customConfigPath)) {
    _nodeLogger.logger.info('=> Using default webpack setup based on "Create React App".');
    return defaultConfig;
  }
  var customConfig = require(customConfigPath);

  if (typeof customConfig === 'function') {
    _nodeLogger.logger.info('=> Loading custom webpack config (full-control mode).');
    return customConfig(config, configType, defaultConfig);
  }
  _nodeLogger.logger.info('=> Loading custom webpack config (extending mode).');
  return (0, _extends3.default)({}, customConfig, config, {
    // Override with custom devtool if provided
    devtool: customConfig.devtool || config.devtool,
    // We need to use our and custom plugins.
    plugins: [].concat((0, _toConsumableArray3.default)(config.plugins), (0, _toConsumableArray3.default)(customConfig.plugins || [])),
    module: (0, _extends3.default)({}, config.module, customConfig.module, {
      rules: [].concat((0, _toConsumableArray3.default)(config.module.rules), (0, _toConsumableArray3.default)(customConfig.module && customConfig.module.rules || []))
    }),
    resolve: (0, _extends3.default)({}, config.resolve, customConfig.resolve, {
      alias: (0, _extends3.default)({}, config.alias, customConfig.resolve && customConfig.resolve.alias)
    })
  });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _findCacheDir = require('find-cache-dir');

var _findCacheDir2 = _interopRequireDefault(_findCacheDir);

var _nodeLogger = require('@storybook/node-logger');

var _server = require('@storybook/core/server');

var _babel_config = require('./babel_config');

var _babel_config2 = _interopRequireDefault(_babel_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }