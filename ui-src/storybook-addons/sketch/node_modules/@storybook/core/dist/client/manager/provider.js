'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _global = require('global');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ui = require('@storybook/ui');

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _channelPostmessage = require('@storybook/channel-postmessage');

var _channelPostmessage2 = _interopRequireDefault(_channelPostmessage);

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactProvider = function (_Provider) {
  (0, _inherits3.default)(ReactProvider, _Provider);

  function ReactProvider() {
    (0, _classCallCheck3.default)(this, ReactProvider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReactProvider.__proto__ || (0, _getPrototypeOf2.default)(ReactProvider)).call(this));

    _this.channel = (0, _channelPostmessage2.default)({ page: 'manager' });
    _addons2.default.setChannel(_this.channel);

    _this.channel.emit('channelCreated');
    return _this;
  }

  (0, _createClass3.default)(ReactProvider, [{
    key: 'getPanels',
    value: function getPanels() {
      return _addons2.default.getPanels();
    }
  }, {
    key: 'renderPreview',
    value: function renderPreview(selectedKind, selectedStory) {
      var queryParams = {
        selectedKind: selectedKind,
        selectedStory: selectedStory
      };

      // Add the react-perf query string to the iframe if that present.
      if (/react_perf/.test(_global.location.search)) {
        queryParams.react_perf = '1';
      }

      var queryString = _qs2.default.stringify(queryParams);
      var url = 'iframe.html?' + queryString;
      return _react2.default.createElement(_preview2.default, { url: url });
    }
  }, {
    key: 'handleAPI',
    value: function handleAPI(api) {
      var _this2 = this;

      api.onStory(function (kind, story) {
        _this2.channel.emit('setCurrentStory', { kind: kind, story: story });
      });
      this.channel.on('setStories', function (data) {
        api.setStories(data.stories);
      });
      this.channel.on('selectStory', function (data) {
        api.selectStory(data.kind, data.story);
      });
      this.channel.on('applyShortcut', function (data) {
        api.handleShortcut(data.event);
      });
      _addons2.default.loadAddons(api);
    }
  }]);
  return ReactProvider;
}(_ui.Provider);

exports.default = ReactProvider;