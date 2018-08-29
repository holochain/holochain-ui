'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hrefTo = exports.linkTo = exports.openLink = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openLink = exports.openLink = function openLink(params) {
  return _addons2.default.getChannel().emit(_.EVENT_ID, params);
};

var valueOrCall = function valueOrCall(args) {
  return function (value) {
    return typeof value === 'function' ? value.apply(undefined, (0, _toConsumableArray3.default)(args)) : value;
  };
};

var linkTo = exports.linkTo = function linkTo(kind, story) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var resolver = valueOrCall(args);
    openLink({
      kind: resolver(kind),
      story: resolver(story)
    });
  };
};

var hrefTo = exports.hrefTo = function hrefTo(kind, story) {
  return new _promise2.default(function (resolve) {
    var channel = _addons2.default.getChannel();
    channel.on(_.RECEIVE_HREF_EVENT_ID, resolve);
    channel.emit(_.REQUEST_HREF_EVENT_ID, { kind: kind, story: story });
  });
};