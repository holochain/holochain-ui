'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (configDir) {
  var entries = {
    preview: [require.resolve('./polyfills'), require.resolve('./globals')],
    manager: [require.resolve('./polyfills'), _server.managerPath]
  };

  var config = {
    bail: true,
    devtool: '#cheap-module-source-map',
    entry: entries,
    output: {
      filename: 'static/[name].[chunkhash].bundle.js',
      // Here we set the publicPath to ''.
      // This allows us to deploy storybook into subpaths like GitHub pages.
      // This works with css and image loaders too.
      // This is working for storybook since, we don't use pushState urls and
      // relative URLs works always.
      publicPath: ''
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
    }), new _webpack2.default.DefinePlugin((0, _utils.loadEnv)({ production: true })), new _uglifyjsWebpackPlugin2.default({
      parallel: true,
      uglifyOptions: {
        ie8: false,
        mangle: false,
        warnings: false,
        compress: {
          keep_fnames: true
        },
        output: {
          comments: false
        }
      }
    }), new _dotenvWebpack2.default({ silent: true })],
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
    }
  };

  return config;
};

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _dotenvWebpack = require('dotenv-webpack');

var _dotenvWebpack2 = _interopRequireDefault(_dotenvWebpack);

var _InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

var _InterpolateHtmlPlugin2 = _interopRequireDefault(_InterpolateHtmlPlugin);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _server = require('@storybook/core/server');

var _babel = require('./babel.prod');

var _babel2 = _interopRequireDefault(_babel);

var _utils = require('./utils');

var _utils2 = require('../utils');

var _package = require('../../../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }