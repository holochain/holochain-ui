"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-underscore-dangle: 0 */

var Channel = function () {
  function Channel(_ref) {
    var transport = _ref.transport;
    (0, _classCallCheck3.default)(this, Channel);

    this._sender = this._randomId();
    this._transport = transport;
    this._transport.setHandler(this._handleEvent.bind(this));
    this._listeners = {};
  }

  (0, _createClass3.default)(Channel, [{
    key: "addListener",
    value: function addListener(type, listener) {
      this.on(type, listener);
    }
  }, {
    key: "addPeerListener",
    value: function addPeerListener(type, listener) {
      var _this = this;

      var peerListener = listener;
      peerListener.isPeer = function (from) {
        return from === _this._sender;
      };
      this.on(type, peerListener);
    }
  }, {
    key: "emit",
    value: function emit(type) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var event = { type: type, args: args, from: this._sender };
      this._transport.send(event);
    }
  }, {
    key: "eventNames",
    value: function eventNames() {
      return (0, _keys2.default)(this._listeners);
    }
  }, {
    key: "listenerCount",
    value: function listenerCount(type) {
      var listeners = this._listeners[type];
      return listeners ? listeners.length : 0;
    }
  }, {
    key: "listeners",
    value: function listeners(type) {
      return this._listeners[type];
    }
  }, {
    key: "on",
    value: function on(type, listener) {
      this._listeners[type] = this._listeners[type] || [];
      this._listeners[type].push(listener);
    }
  }, {
    key: "once",
    value: function once(type, listener) {
      var onceListener = this._onceListener(type, listener);
      this.on(type, onceListener);
    }
  }, {
    key: "prependListener",
    value: function prependListener(type, listener) {
      this._listeners[type] = this._listeners[type] || [];
      this._listeners[type].unshift(listener);
    }
  }, {
    key: "prependOnceListener",
    value: function prependOnceListener(type, listener) {
      var onceListener = this._onceListener(type, listener);
      this.prependListener(type, onceListener);
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(type) {
      if (!type) {
        this._listeners = {};
      } else if (this._listeners[type]) {
        delete this._listeners[type];
      }
    }
  }, {
    key: "removeListener",
    value: function removeListener(type, listener) {
      var listeners = this._listeners[type];
      if (listeners) {
        this._listeners[type] = listeners.filter(function (l) {
          return l !== listener;
        });
      }
    }
  }, {
    key: "_randomId",
    value: function _randomId() {
      // generates a random 13 character string
      return Math.random().toString(16).slice(2);
    }
  }, {
    key: "_handleEvent",
    value: function _handleEvent(event) {
      var listeners = this._listeners[event.type];
      if (listeners) {
        listeners.forEach(function (fn) {
          return !(fn.isPeer && fn.isPeer(event.from)) && fn.apply(undefined, (0, _toConsumableArray3.default)(event.args));
        });
      }
    }
  }, {
    key: "_onceListener",
    value: function _onceListener(type, listener) {
      var _this2 = this;

      var onceListener = function onceListener() {
        _this2.removeListener(type, onceListener);
        return listener.apply(undefined, arguments);
      };
      return onceListener;
    }
  }]);
  return Channel;
}();

exports.default = Channel;