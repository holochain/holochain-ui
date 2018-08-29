'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = syncUrlToStore;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _global = require('global');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Ensure the story in the redux store and on the preview URL are in sync.
// In theory we should listen to pushState events but given it's an iframe
// the user can't actually change the URL.
// We should change this if we support a "preview only" mode in the future.
function syncUrlToStore(reduxStore) {
  // handle query params
  var queryParams = _qs2.default.parse(_global.window.location.search.substring(1));
  if (queryParams.selectedKind) {
    reduxStore.dispatch((0, _actions.selectStory)(queryParams.selectedKind, queryParams.selectedStory));
  }

  reduxStore.subscribe(function () {
    var _reduxStore$getState = reduxStore.getState(),
        selectedKind = _reduxStore$getState.selectedKind,
        selectedStory = _reduxStore$getState.selectedStory;

    var queryString = _qs2.default.stringify((0, _extends3.default)({}, queryParams, {
      selectedKind: selectedKind,
      selectedStory: selectedStory
    }));
    _global.window.history.replaceState({}, '', '?' + queryString);
  });
}