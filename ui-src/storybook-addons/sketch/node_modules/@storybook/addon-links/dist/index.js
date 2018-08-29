'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preview = require('./preview');

Object.defineProperty(exports, 'linkTo', {
  enumerable: true,
  get: function get() {
    return _preview.linkTo;
  }
});
Object.defineProperty(exports, 'hrefTo', {
  enumerable: true,
  get: function get() {
    return _preview.hrefTo;
  }
});
exports.LinkTo = LinkTo;
var ADDON_ID = exports.ADDON_ID = 'storybook/links';
var EVENT_ID = exports.EVENT_ID = ADDON_ID + '/link-event';
var REQUEST_HREF_EVENT_ID = exports.REQUEST_HREF_EVENT_ID = ADDON_ID + '/request-href-event';
var RECEIVE_HREF_EVENT_ID = exports.RECEIVE_HREF_EVENT_ID = ADDON_ID + '/receive-href-event';

var hasWarned = false;

function LinkTo() {
  if (!hasWarned) {
    // eslint-disable-next-line no-console
    console.error('\nLinkTo has moved to addon-links/react:\n\nimport LinkTo from \'@storybook/addon-links/react\';\n    ');
    hasWarned = true;
  }
  return null;
}