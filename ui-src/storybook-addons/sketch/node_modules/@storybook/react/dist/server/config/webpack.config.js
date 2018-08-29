'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (configDir, quiet) {
  var config = {
    devtool: 'cheap-module-source-map',
    entry: {
      manager: [require.resolve('./polyfills'), _server.managerPath],
      preview: [require.resolve('./polyfills'), require.resolve('./globals'), require.resolve('webpack-hot-middleware/client') + '?reload=true']
    },
    output: {
      path: _path2.default.join(__dirname, 'dist'),
      filename: 'static/[name].bundle.js',
      publicPath: '/'
    },
    plugins: [new _InterpolateHtmlPlugin2.default(process.env), new _htmlWebpackPlugin2.default({
      filename: 'index.html',
      chunks: ['manager'],
      data: {
        managerHead: (0, _utils2.getManagerHeadHtml)(configDir),
        version: _package.version
      },
      template: require.resolve('../index.html.ejs')
    }), new _htmlWebpackPlugin2.default({
      filename: 'iframe.html',
      excludeChunks: ['manager'],
      data: {
        previewHead: (0, _utils2.getPreviewHeadHtml)(configDir)
      },
      template: require.resolve('../iframe.html.ejs')
    }), new _webpack2.default.DefinePlugin((0, _utils.loadEnv)()), new _webpack2.default.HotModuleReplacementPlugin(), new _caseSensitivePathsWebpackPlugin2.default(), new _WatchMissingNodeModulesPlugin2.default(_utils.nodeModulesPaths), quiet ? null : new _webpack2.default.ProgressPlugin(), new _dotenvWebpack2.default({ silent: true })].filter(Boolean),
    module: {
      rules: [{
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        query: _babel2.default,
        include: _utils.includePaths,
        exclude: _utils.excludePaths
      }, {
        test: /\.md$/,
        use: [{
          loader: require.resolve('html-loader')
        }, {
          loader: require.resolve('markdown-loader')
        }]
      }]
    },
    resolve: {
      // Since we ship with json-loader always, it's better to move extensions to here
      // from the default config.
      extensions: ['.js', '.json', '.jsx'],
      // Add support to NODE_PATH. With this we could avoid relative path imports.
      // Based on this CRA feature: https://github.com/facebookincubator/create-react-app/issues/253
      modules: ['node_modules'].concat(_utils.nodePaths)
    },
    performance: {
      hints: false
    }
  };

  return config;
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _dotenvWebpack = require('dotenv-webpack');

var _dotenvWebpack2 = _interopRequireDefault(_dotenvWebpack);

var _InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

var _InterpolateHtmlPlugin2 = _interopRequireDefault(_InterpolateHtmlPlugin);

var _WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

var _WatchMissingNodeModulesPlugin2 = _interopRequireDefault(_WatchMissingNodeModulesPlugin);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _server = require('@storybook/core/server');

var _utils = require('./utils');

var _babel = require('./babel');

var _babel2 = _interopRequireDefault(_babel);

var _utils2 = require('../utils');

var _package = require('../../../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }