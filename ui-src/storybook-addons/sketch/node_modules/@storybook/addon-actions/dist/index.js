'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateAction = exports.configureActions = exports.action = exports.EVENT_ID = exports.PANEL_ID = exports.ADDON_ID = undefined;

var _preview = require('./preview');

// addons, panels and events get unique names using a prefix
var ADDON_ID = exports.ADDON_ID = 'storybook/actions';
var PANEL_ID = exports.PANEL_ID = ADDON_ID + '/actions-panel';
var EVENT_ID = exports.EVENT_ID = ADDON_ID + '/action-event';

exports.action = _preview.action;
exports.configureActions = _preview.configureActions;
exports.decorateAction = _preview.decorateAction;