'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.createDefaultWebpackConfig = createDefaultWebpackConfig;

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDefaultWebpackConfig(storybookBaseConfig) {
  return (0, _extends3.default)({}, storybookBaseConfig, {
    module: (0, _extends3.default)({}, storybookBaseConfig.module, {
      rules: [].concat((0, _toConsumableArray3.default)(storybookBaseConfig.module.rules), [{
        test: /\.css$/,
        use: [require.resolve('style-loader'), {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1
          }
        }, {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
            plugins: function plugins() {
              return [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer2.default)({
                browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                flexbox: 'no-2009'
              })];
            }
          }
        }]
      }, {
        test: /\.json$/,
        loader: require.resolve('json-loader')
      }, {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: require.resolve('file-loader'),
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }])
    }),
    resolve: (0, _extends3.default)({}, storybookBaseConfig.resolve, {
      alias: (0, _extends3.default)({}, storybookBaseConfig.resolve && storybookBaseConfig.resolve.alias, {
        // This is to support NPM2
        'babel-runtime/regenerator': require.resolve('babel-runtime/regenerator')
      })
    })
  });
}