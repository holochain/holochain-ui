'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0; /* eslint no-underscore-dangle: 0 */


function getId() {
  count += 1;
  return count;
}

var StoryStore = function (_EventEmitter) {
  (0, _inherits3.default)(StoryStore, _EventEmitter);

  function StoryStore() {
    (0, _classCallCheck3.default)(this, StoryStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StoryStore.__proto__ || (0, _getPrototypeOf2.default)(StoryStore)).call(this));

    _this._data = {};
    _this._revision = 0;
    return _this;
  }

  (0, _createClass3.default)(StoryStore, [{
    key: 'getRevision',
    value: function getRevision() {
      return this._revision;
    }
  }, {
    key: 'incrementRevision',
    value: function incrementRevision() {
      this._revision += 1;
    }
  }, {
    key: 'addStory',
    value: function addStory(kind, name, fn, fileName) {
      if (!this._data[kind]) {
        this._data[kind] = {
          kind: kind,
          fileName: fileName,
          index: getId(),
          stories: {}
        };
      }

      this._data[kind].stories[name] = {
        name: name,
        index: getId(),
        fn: fn
      };

      this.emit('storyAdded', kind, name, fn);
    }
  }, {
    key: 'getStoryKinds',
    value: function getStoryKinds() {
      var _this2 = this;

      return (0, _keys2.default)(this._data).map(function (key) {
        return _this2._data[key];
      }).filter(function (kind) {
        return (0, _keys2.default)(kind.stories).length > 0;
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.kind;
      });
    }
  }, {
    key: 'getStories',
    value: function getStories(kind) {
      var _this3 = this;

      if (!this._data[kind]) {
        return [];
      }

      return (0, _keys2.default)(this._data[kind].stories).map(function (name) {
        return _this3._data[kind].stories[name];
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.name;
      });
    }
  }, {
    key: 'getStoryFileName',
    value: function getStoryFileName(kind) {
      var storiesKind = this._data[kind];
      if (!storiesKind) {
        return null;
      }

      return storiesKind.fileName;
    }
  }, {
    key: 'getStory',
    value: function getStory(kind, name) {
      var storiesKind = this._data[kind];
      if (!storiesKind) {
        return null;
      }

      var storyInfo = storiesKind.stories[name];
      if (!storyInfo) {
        return null;
      }

      return storyInfo.fn;
    }
  }, {
    key: 'removeStoryKind',
    value: function removeStoryKind(kind) {
      if (this.hasStoryKind(kind)) {
        this._data[kind].stories = {};
      }
    }
  }, {
    key: 'hasStoryKind',
    value: function hasStoryKind(kind) {
      return Boolean(this._data[kind]);
    }
  }, {
    key: 'hasStory',
    value: function hasStory(kind, name) {
      return Boolean(this.getStory(kind, name));
    }
  }, {
    key: 'dumpStoryBook',
    value: function dumpStoryBook() {
      var _this4 = this;

      var data = this.getStoryKinds().map(function (kind) {
        return {
          kind: kind,
          stories: _this4.getStories(kind)
        };
      });

      return data;
    }
  }, {
    key: 'size',
    value: function size() {
      return (0, _keys2.default)(this._data).length;
    }
  }, {
    key: 'clean',
    value: function clean() {
      var _this5 = this;

      this.getStoryKinds().forEach(function (kind) {
        return delete _this5._data[kind];
      });
    }
  }]);
  return StoryStore;
}(_events.EventEmitter);

exports.default = StoryStore;