'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddonStore = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddonStore = exports.AddonStore = function () {
  function AddonStore() {
    (0, _classCallCheck3.default)(this, AddonStore);

    this.loaders = {};
    this.panels = {};
    this.channel = null;
    this.preview = null;
    this.database = null;
  }

  (0, _createClass3.default)(AddonStore, [{
    key: 'getChannel',
    value: function getChannel() {
      // this.channel should get overwritten by setChannel if package versions are
      // correct and AddonStore is a proper singleton. If not, throw.
      if (!this.channel) {
        throw new Error('Accessing nonexistent addons channel, see https://storybook.js.org/basics/faq/#why-is-there-no-addons-channel');
      }
      return this.channel;
    }
  }, {
    key: 'setChannel',
    value: function setChannel(channel) {
      this.channel = channel;
    }
  }, {
    key: 'getPreview',
    value: function getPreview() {
      return this.preview;
    }
  }, {
    key: 'setPreview',
    value: function setPreview(preview) {
      this.preview = preview;
    }
  }, {
    key: 'getDatabase',
    value: function getDatabase() {
      return this.database;
    }
  }, {
    key: 'setDatabase',
    value: function setDatabase(database) {
      this.database = database;
    }
  }, {
    key: 'getPanels',
    value: function getPanels() {
      return this.panels;
    }
  }, {
    key: 'addPanel',
    value: function addPanel(name, panel) {
      this.panels[name] = panel;
    }
  }, {
    key: 'register',
    value: function register(name, loader) {
      this.loaders[name] = loader;
    }
  }, {
    key: 'loadAddons',
    value: function loadAddons(api) {
      var _this = this;

      (0, _keys2.default)(this.loaders).map(function (name) {
        return _this.loaders[name];
      }).forEach(function (loader) {
        return loader(api);
      });
    }
  }]);
  return AddonStore;
}();

exports.default = new AddonStore();