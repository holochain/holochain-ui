'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostmsgTransport = exports.KEY = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = createChannel;

var _global = require('global');

var _channels = require('@storybook/channels');

var _channels2 = _interopRequireDefault(_channels);

var _jsonStringifySafe = require('json-stringify-safe');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = exports.KEY = 'storybook-channel'; /* eslint-disable no-underscore-dangle */

var PostmsgTransport = exports.PostmsgTransport = function () {
  function PostmsgTransport(config) {
    var _this = this;

    (0, _classCallCheck3.default)(this, PostmsgTransport);

    this._config = config;
    this._buffer = [];
    this._handler = null;
    _global.window.addEventListener('message', this._handleEvent.bind(this), false);
    _global.document.addEventListener('DOMContentLoaded', function () {
      return _this._flush();
    });
    // Check whether the config.page parameter has a valid value
    if (config.page !== 'manager' && config.page !== 'preview') {
      throw new Error('postmsg-channel: "config.page" cannot be "' + config.page + '"');
    }
  }

  (0, _createClass3.default)(PostmsgTransport, [{
    key: 'setHandler',
    value: function setHandler(handler) {
      this._handler = handler;
    }
  }, {
    key: 'send',
    value: function send(event) {
      var _this2 = this;

      var iframeWindow = this._getWindow();
      if (!iframeWindow) {
        return new _promise2.default(function (resolve, reject) {
          _this2._buffer.push({ event: event, resolve: resolve, reject: reject });
        });
      }
      var data = (0, _jsonStringifySafe2.default)({ key: KEY, event: event });
      iframeWindow.postMessage(data, '*');
      return _promise2.default.resolve(null);
    }
  }, {
    key: '_flush',
    value: function _flush() {
      var _this3 = this;

      var buffer = this._buffer;
      this._buffer = [];
      buffer.forEach(function (item) {
        _this3.send(item.event).then(item.resolve).catch(item.reject);
      });
    }
  }, {
    key: '_getWindow',
    value: function _getWindow() {
      if (this._config.page === 'manager') {
        // FIXME this is a really bad idea! use a better way to do this.
        // This finds the storybook preview iframe to send messages to.
        var iframe = _global.document.getElementById('storybook-preview-iframe');
        if (!iframe) {
          return null;
        }
        return iframe.contentWindow;
      }
      return _global.window.parent;
    }
  }, {
    key: '_handleEvent',
    value: function _handleEvent(rawEvent) {
      try {
        var data = rawEvent.data;

        var _JSON$parse = JSON.parse(data),
            key = _JSON$parse.key,
            event = _JSON$parse.event;

        if (key === KEY) {
          this._handler(event);
        }
      } catch (error) {} // eslint-disable-line
    }
  }]);
  return PostmsgTransport;
}();

function createChannel(_ref) {
  var page = _ref.page;

  var transport = new PostmsgTransport({ page: page });
  return new _channels2.default({ transport: transport });
}