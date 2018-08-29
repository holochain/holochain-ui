'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forceReRender = exports.configure = exports.getStorybook = exports.clearDecorators = exports.addDecorator = exports.setAddon = exports.storiesOf = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _redux = require('redux');

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _global = require('global');

var _channelPostmessage = require('@storybook/channel-postmessage');

var _channelPostmessage2 = _interopRequireDefault(_channelPostmessage);

var _key_events = require('@storybook/ui/dist/libs/key_events');

var _client = require('@storybook/core/client');

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check whether we're running on node/browser
var isBrowser = _global.navigator && _global.navigator.userAgent && _global.navigator.userAgent !== 'storyshots' && !(_global.navigator.userAgent.indexOf('Node.js') > -1) && !(_global.navigator.userAgent.indexOf('jsdom') > -1);

var storyStore = new _client.StoryStore();
var reduxStore = (0, _redux.createStore)(_client.reducer);
var context = { storyStore: storyStore, reduxStore: reduxStore };

var clientApi = new _client.ClientApi(context);
var storiesOf = clientApi.storiesOf,
    setAddon = clientApi.setAddon,
    addDecorator = clientApi.addDecorator,
    clearDecorators = clientApi.clearDecorators,
    getStorybook = clientApi.getStorybook;
exports.storiesOf = storiesOf;
exports.setAddon = setAddon;
exports.addDecorator = addDecorator;
exports.clearDecorators = clearDecorators;
exports.getStorybook = getStorybook;


var channel = void 0;
if (isBrowser) {
  // setup preview channel
  channel = (0, _channelPostmessage2.default)({ page: 'preview' });
  channel.on('setCurrentStory', function (data) {
    reduxStore.dispatch(_client.Actions.selectStory(data.kind, data.story));
  });
  _addons2.default.setChannel(channel);
  (0, _assign2.default)(context, { channel: channel });

  (0, _client.syncUrlWithStore)(reduxStore);

  // Handle keyboard shortcuts
  _global.window.onkeydown = (0, _key_events.handleKeyboardShortcuts)(channel);
}

// Provide access to external scripts if `window` is defined.
// NOTE this is different to isBrowser, primarily for the JSDOM use case
if (typeof _global.window !== 'undefined') {
  _global.window.__STORYBOOK_CLIENT_API__ = clientApi;
  _global.window.__STORYBOOK_ADDONS_CHANNEL__ = channel; // may not be defined
}

var configApi = new _client.ConfigApi((0, _extends3.default)({ clearDecorators: clearDecorators }, context));
var configure = configApi.configure;

// initialize the UI

exports.configure = configure;
var renderUI = function renderUI() {
  if (isBrowser) {
    (0, _render2.default)(context);
  }
};

reduxStore.subscribe(renderUI);

var forceReRender = exports.forceReRender = function forceReRender() {
  return (0, _render2.default)(context, true);
};