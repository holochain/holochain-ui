'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = action;

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _ = require('../');

var _util = require('../lib/util');

var _configureActions = require('./configureActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function action(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var actionOptions = (0, _extends3.default)({}, _configureActions.config, options);

  // eslint-disable-next-line no-shadow
  var handler = function action() {
    for (var _len = arguments.length, _args = Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    var args = _args.map(function (arg) {
      return (0, _util.prepareArguments)(arg, actionOptions.depth);
    });
    var channel = _addons2.default.getChannel();
    var id = (0, _v2.default)();
    channel.emit(_.EVENT_ID, {
      id: id,
      data: { name: name, args: args }
    });
  };

  if (_util.canConfigureName && name && typeof name === 'string') {
    Object.defineProperty(handler, 'name', { value: name });
  }
  return handler;
}