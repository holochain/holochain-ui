'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _webpack = require('webpack');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dotenv = function () {
  /**
   * The dotenv-webpack plugin.
   * @param {Object} options - The parameters.
   * @param {String} [options.path=./.env] - The location of the environment variable.
   * @param {Bool|String} [options.safe=false] - If false ignore safe-mode, if true load `'./.env.example'`, if a string load that file as the sample.
   * @param {Bool} [options.systemvars=false] - If true, load system environment variables.
   * @param {Bool} [options.silent=false] - If true, suppress warnings, if false, display warnings.
   * @returns {webpack.DefinePlugin}
   */
  function Dotenv() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$path = _ref.path,
        path = _ref$path === undefined ? './.env' : _ref$path,
        safe = _ref.safe,
        systemvars = _ref.systemvars,
        silent = _ref.silent,
        sample = _ref.sample;

    _classCallCheck(this, Dotenv);

    // Catch older packages, but hold their hand (just for a bit)
    if (sample) {
      if (safe) {
        safe = sample;
      }
      this.warn('dotenv-webpack: "options.sample" is a deprecated property. Please update your configuration to use "options.safe" instead.', silent);
    }

    var vars = {};
    if (systemvars) {
      Object.keys(process.env).map(function (key) {
        vars[key] = process.env[key];
      });
    }

    var env = this.loadFile(path, silent);

    var blueprint = env;
    if (safe) {
      var file = './.env.example';
      if (safe !== true) {
        file = safe;
      }
      blueprint = this.loadFile(file, silent);
    }

    Object.keys(blueprint).map(function (key) {
      var value = vars.hasOwnProperty(key) ? vars[key] : env[key];
      if (!value && safe) {
        throw new Error('Missing environment variable: ' + key);
      } else {
        vars[key] = value;
      }
    });

    var formatData = Object.keys(vars).reduce(function (obj, key) {
      obj['process.env.' + key] = JSON.stringify(vars[key]);
      return obj;
    }, {});

    return new _webpack.DefinePlugin(formatData);
  }

  /**
   * Load and parses a file.
   * @param {String} file - The file to load.
   * @param {Bool} silent - If true, suppress warnings, if false, display warnings.
   * @returns {Object}
   */


  _createClass(Dotenv, [{
    key: 'loadFile',
    value: function loadFile(file, silent) {
      try {
        return _dotenv2.default.parse(_fs2.default.readFileSync(file));
      } catch (err) {
        this.warn('Failed to load ' + file + '.', silent);
        return {};
      }
    }

    /**
     * Displays a console message if 'silent' is falsey
     * @param {String} msg - The message.
     * @param {Bool} silent - If true, display the message, if false, suppress the message.
     */

  }, {
    key: 'warn',
    value: function warn(msg, silent) {
      !silent && console.warn(msg);
    }
  }]);

  return Dotenv;
}();

exports.default = Dotenv;