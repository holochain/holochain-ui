'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _lib = require('../../lib');

var _util = require('../../lib/util');

var _ActionLogger = require('../../components/ActionLogger/');

var _ActionLogger2 = _interopRequireDefault(_ActionLogger);

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionLogger = function (_React$Component) {
  (0, _inherits3.default)(ActionLogger, _React$Component);

  function ActionLogger(props) {
    var _ref;

    (0, _classCallCheck3.default)(this, ActionLogger);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = ActionLogger.__proto__ || (0, _getPrototypeOf2.default)(ActionLogger)).call.apply(_ref, [this, props].concat(args)));

    _this.state = { actions: [] };
    _this._actionListener = function (action) {
      return _this.addAction(action);
    };
    return _this;
  }

  (0, _createClass3.default)(ActionLogger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.channel.on(_.EVENT_ID, this._actionListener);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.channel.removeListener(_.EVENT_ID, this._actionListener);
    }
  }, {
    key: 'addAction',
    value: function addAction(action) {
      action.data.args = action.data.args.map(function (arg) {
        return (0, _lib.retrocycle)(arg);
      }); // eslint-disable-line
      var isCyclic = !!action.data.args.find(function (arg) {
        return (0, _util.isObject)(arg) && arg[_lib.CYCLIC_KEY];
      });
      var actions = [].concat((0, _toConsumableArray3.default)(this.state.actions));
      var previous = actions.length && actions[0];

      if (previous && !isCyclic && (0, _deepEqual2.default)(previous.data, action.data, { strict: true })) {
        previous.count++; // eslint-disable-line
      } else {
        action.count = 1; // eslint-disable-line
        actions.unshift(action);
      }
      this.setState({ actions: actions });
    }
  }, {
    key: 'clearActions',
    value: function clearActions() {
      this.setState({ actions: [] });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = {
        actions: this.state.actions,
        onClear: function onClear() {
          return _this2.clearActions();
        }
      };
      return _react2.default.createElement(_ActionLogger2.default, props);
    }
  }]);
  return ActionLogger;
}(_react2.default.Component); /* eslint-disable no-underscore-dangle */

exports.default = ActionLogger;


ActionLogger.propTypes = {
  channel: _propTypes2.default.object // eslint-disable-line react/forbid-prop-types
};
ActionLogger.defaultProps = {
  channel: {}
};