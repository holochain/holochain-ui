'use strict';

var _utilDeprecate = require('util-deprecate');

var _utilDeprecate2 = _interopRequireDefault(_utilDeprecate);

var _server = require('@storybook/core/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _utilDeprecate2.default)(_server.createDefaultWebpackConfig, "importing default webpack config generator from '@storybook/react/dist/server/config/defaults/webpack.config.js' is deprecated. Use third argument of your exported function instead. See https://storybook.js.org/configurations/custom-webpack-config/#full-control-mode--default");