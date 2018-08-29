'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkTo = exports.action = exports.forceReRender = exports.getStorybook = exports.configure = exports.addDecorator = exports.setAddon = exports.storiesOf = undefined;

var _preview = require('./preview');

Object.defineProperty(exports, 'storiesOf', {
  enumerable: true,
  get: function get() {
    return _preview.storiesOf;
  }
});
Object.defineProperty(exports, 'setAddon', {
  enumerable: true,
  get: function get() {
    return _preview.setAddon;
  }
});
Object.defineProperty(exports, 'addDecorator', {
  enumerable: true,
  get: function get() {
    return _preview.addDecorator;
  }
});
Object.defineProperty(exports, 'configure', {
  enumerable: true,
  get: function get() {
    return _preview.configure;
  }
});
Object.defineProperty(exports, 'getStorybook', {
  enumerable: true,
  get: function get() {
    return _preview.getStorybook;
  }
});
Object.defineProperty(exports, 'forceReRender', {
  enumerable: true,
  get: function get() {
    return _preview.forceReRender;
  }
});

var _utilDeprecate = require('util-deprecate');

var _utilDeprecate2 = _interopRequireDefault(_utilDeprecate);

var _addonActions = require('@storybook/addon-actions');

var _addonLinks = require('@storybook/addon-links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var action = exports.action = (0, _utilDeprecate2.default)(_addonActions.action, '@storybook/react action is deprecated. See: https://github.com/storybooks/storybook/tree/master/addons/actions');

var linkTo = exports.linkTo = (0, _utilDeprecate2.default)(_addonLinks.linkTo, '@storybook/react linkTo is deprecated. See: https://github.com/storybooks/storybook/tree/master/addons/links');