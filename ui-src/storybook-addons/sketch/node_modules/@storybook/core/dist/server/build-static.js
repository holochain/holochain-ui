'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStatic = buildStatic;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _nodeLogger = require('@storybook/node-logger');

var _utils = require('./utils');

require('./config/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildStatic(_ref) {
  var packageJson = _ref.packageJson,
      getBaseConfig = _ref.getBaseConfig,
      loadConfig = _ref.loadConfig,
      defaultFavIcon = _ref.defaultFavIcon;

  process.env.NODE_ENV = process.env.NODE_ENV || 'production';

  _commander2.default.version(packageJson.version).option('-s, --static-dir <dir-names>', 'Directory where to load static files from', _utils.parseList).option('-o, --output-dir [dir-name]', 'Directory where to store built files').option('-c, --config-dir [dir-name]', 'Directory where to load Storybook configurations from').option('-w, --watch', 'Enable watch mode').option('-d, --db-path [db-file]', 'DEPRECATED!').option('--enable-db', 'DEPRECATED!').parse(process.argv);

  _nodeLogger.logger.info(_chalk2.default.bold(packageJson.name + ' v' + packageJson.version + '\n'));

  if (_commander2.default.enableDb || _commander2.default.dbPath) {
    _nodeLogger.logger.error(['Error: the experimental local database addon is no longer bundled with', 'storybook. Please remove these flags (-d,--db-path,--enable-db)', 'from the command or npm script and try again.'].join(' '));
    process.exit(1);
  }

  // The key is the field created in `program` variable for
  // each command line argument. Value is the env variable.
  (0, _utils.getEnvConfig)(_commander2.default, {
    staticDir: 'SBCONFIG_STATIC_DIR',
    outputDir: 'SBCONFIG_OUTPUT_DIR',
    configDir: 'SBCONFIG_CONFIG_DIR'
  });

  var configDir = _commander2.default.configDir || './.storybook';
  var outputDir = _commander2.default.outputDir || './storybook-static';

  // create output directory if not exists
  _shelljs2.default.mkdir('-p', _path2.default.resolve(outputDir));
  // clear the static dir
  _shelljs2.default.rm('-rf', _path2.default.resolve(outputDir, 'static'));
  _shelljs2.default.cp(defaultFavIcon, outputDir);

  // Build the webpack configuration using the `baseConfig`
  // custom `.babelrc` file and `webpack.config.js` files
  // NOTE changes to env should be done before calling `getBaseConfig`
  var config = loadConfig('PRODUCTION', getBaseConfig(configDir), configDir);
  config.output.path = _path2.default.resolve(outputDir);

  // copy all static files
  if (_commander2.default.staticDir) {
    _commander2.default.staticDir.forEach(function (dir) {
      if (!_fs2.default.existsSync(dir)) {
        _nodeLogger.logger.error('Error: no such directory to load static files: ' + dir);
        process.exit(-1);
      }
      _nodeLogger.logger.info('=> Copying static files from: ' + dir);
      _shelljs2.default.cp('-r', dir + '/*', outputDir);
    });
  }

  // compile all resources with webpack and write them to the disk.
  _nodeLogger.logger.info('Building storybook ...');
  var webpackCb = function webpackCb(err, stats) {
    if (err || stats.hasErrors()) {
      _nodeLogger.logger.error('Failed to build the storybook');
      // eslint-disable-next-line no-unused-expressions
      err && _nodeLogger.logger.error(err.message);
      // eslint-disable-next-line no-unused-expressions
      stats && stats.hasErrors() && stats.toJson().errors.forEach(function (e) {
        return _nodeLogger.logger.error(e);
      });
      process.exitCode = 1;
    }
    _nodeLogger.logger.info('Building storybook completed.');
  };
  var compiler = (0, _webpack2.default)(config);
  if (_commander2.default.watch) {
    compiler.watch({}, webpackCb);
  } else {
    compiler.run(webpackCb);
  }
}