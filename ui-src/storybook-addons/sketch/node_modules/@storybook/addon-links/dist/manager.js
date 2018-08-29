'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _global = require('global');

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function register() {
  _addons2.default.register(_.ADDON_ID, function (api) {
    var channel = _addons2.default.getChannel();
    channel.on(_.EVENT_ID, function (selection) {
      if (selection.kind != null) {
        api.selectStory(selection.kind, selection.story);
      } else {
        api.selectInCurrentKind(selection.story);
      }
    });
    channel.on(_.REQUEST_HREF_EVENT_ID, function (selection) {
      var params = selection.kind != null ? {
        selectedKind: selection.kind,
        selectedStory: selection.story
      } : {
        selectedStory: selection.story
      };
      var urlState = api.getUrlState(params);
      channel.emit(_.RECEIVE_HREF_EVENT_ID, _global.location.pathname + urlState.url);
    });
  });
}