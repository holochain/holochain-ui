'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (configDir) {
  var babelConfig = loadFromPath(_path2.default.resolve(configDir, '.babelrc'));
  var inConfigDir = true;

  if (!babelConfig) {
    babelConfig = loadFromPath('.babelrc');
    inConfigDir = false;
  }

  if (babelConfig) {
    // If the custom config uses babel's `extends` clause, then replace it with
    // an absolute path. `extends` will not work unless we do this.
    if (babelConfig.extends) {
      babelConfig.extends = inConfigDir ? _path2.default.resolve(configDir, babelConfig.extends) : _path2.default.resolve(babelConfig.extends);
    }
  }

  var finalConfig = babelConfig || _babel2.default;
  // Ensure plugins are defined or fallback to an array to avoid empty values.
  var babelConfigPlugins = finalConfig.plugins || [];
  var extraPlugins = [[require.resolve('babel-plugin-react-docgen'), {
    DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES'
  }]];
  // If `babelConfigPlugins` is not an `Array`, calling `concat` will inject it
  // as a single value, if it is an `Array` it will be spreaded.
  finalConfig.plugins = [].concat(babelConfigPlugins, extraPlugins);

  return finalConfig;
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

var _nodeLogger = require('@storybook/node-logger');

var _babel = require('./config/babel');

var _babel2 = _interopRequireDefault(_babel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeReactHmre(presets) {
  var index = presets.indexOf('react-hmre');
  if (index > -1) {
    presets.splice(index, 1);
  }
}

// Tries to load a .babelrc and returns the parsed object if successful
function loadFromPath(babelConfigPath) {
  var config = void 0;
  if (_fs2.default.existsSync(babelConfigPath)) {
    var content = _fs2.default.readFileSync(babelConfigPath, 'utf-8');
    try {
      config = _json2.default.parse(content);
      config.babelrc = false;
      _nodeLogger.logger.info('=> Loading custom .babelrc');
    } catch (e) {
      _nodeLogger.logger.error('=> Error parsing .babelrc file: ' + e.message);
      throw e;
    }
  }

  if (!config) return null;

  // Remove react-hmre preset.
  // It causes issues with react-storybook.
  // We don't really need it.
  // Earlier, we fix this by running storybook in the production mode.
  // But, that hide some useful debug messages.
  if (config.presets) {
    removeReactHmre(config.presets);
  }

  if (config.env && config.env.development && config.env.development.presets) {
    removeReactHmre(config.env.development.presets);
  }

  return config;
}