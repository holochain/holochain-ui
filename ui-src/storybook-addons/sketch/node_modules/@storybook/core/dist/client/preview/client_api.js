'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _clientLogger = require('@storybook/client-logger');

var _story_store = require('./story_store');

var _story_store2 = _interopRequireDefault(_story_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-underscore-dangle: 0 */

var defaultDecorateStory = function defaultDecorateStory(getStory, decorators) {
  return decorators.reduce(function (decorated, decorator) {
    return function (context) {
      return decorator(function () {
        return decorated(context);
      }, context);
    };
  }, getStory);
};

var ClientApi = function ClientApi() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$storyStore = _ref.storyStore,
      storyStore = _ref$storyStore === undefined ? new _story_store2.default() : _ref$storyStore,
      _ref$decorateStory = _ref.decorateStory,
      decorateStory = _ref$decorateStory === undefined ? defaultDecorateStory : _ref$decorateStory;

  (0, _classCallCheck3.default)(this, ClientApi);

  this.setAddon = function (addon) {
    _this._addons = (0, _extends3.default)({}, _this._addons, addon);
  };

  this.addDecorator = function (decorator) {
    _this._globalDecorators.push(decorator);
  };

  this.clearDecorators = function () {
    _this._globalDecorators = [];
  };

  this.storiesOf = function (kind, m) {
    if (!kind && typeof kind !== 'string') {
      throw new Error('Invalid or missing kind provided for stories, should be a string');
    }

    if (!m) {
      _clientLogger.logger.warn('Missing \'module\' parameter for story with a kind of \'' + kind + '\'. It will break your HMR');
    }

    if (m && m.hot && m.hot.dispose) {
      m.hot.dispose(function () {
        _this._storyStore.removeStoryKind(kind);
        _this._storyStore.incrementRevision();
      });
    }

    var localDecorators = [];
    var api = {
      kind: kind
    };

    // apply addons
    (0, _keys2.default)(_this._addons).forEach(function (name) {
      var addon = _this._addons[name];
      api[name] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        addon.apply(api, args);
        return api;
      };
    });

    api.add = function (storyName, getStory) {
      if (typeof storyName !== 'string') {
        throw new Error('Invalid or missing storyName provided for a "' + kind + '" story.');
      }

      if (_this._storyStore.hasStory(kind, storyName)) {
        throw new Error('Story of "' + kind + '" named "' + storyName + '" already exists');
      }

      // Wrap the getStory function with each decorator. The first
      // decorator will wrap the story function. The second will
      // wrap the first decorator and so on.
      var decorators = [].concat(localDecorators, (0, _toConsumableArray3.default)(_this._globalDecorators));

      var fileName = m ? m.filename : null;

      // Add the fully decorated getStory function.
      _this._storyStore.addStory(kind, storyName, _this._decorateStory(getStory, decorators), fileName);
      return api;
    };

    api.addDecorator = function (decorator) {
      localDecorators.push(decorator);
      return api;
    };

    return api;
  };

  this.getStorybook = function () {
    return _this._storyStore.getStoryKinds().map(function (kind) {
      var fileName = _this._storyStore.getStoryFileName(kind);

      var stories = _this._storyStore.getStories(kind).map(function (name) {
        var render = _this._storyStore.getStory(kind, name);
        return { name: name, render: render };
      });

      return { kind: kind, fileName: fileName, stories: stories };
    });
  };

  this._storyStore = storyStore;
  this._addons = {};
  this._globalDecorators = [];
  this._decorateStory = decorateStory;
};

exports.default = ClientApi;