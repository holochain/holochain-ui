'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactInspector = require('react-inspector');

var _reactInspector2 = _interopRequireDefault(_reactInspector);

var _style = require('./style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionLogger = function (_Component) {
  (0, _inherits3.default)(ActionLogger, _Component);

  function ActionLogger() {
    (0, _classCallCheck3.default)(this, ActionLogger);
    return (0, _possibleConstructorReturn3.default)(this, (ActionLogger.__proto__ || (0, _getPrototypeOf2.default)(ActionLogger)).apply(this, arguments));
  }

  (0, _createClass3.default)(ActionLogger, [{
    key: 'getActionData',
    value: function getActionData() {
      var _this2 = this;

      return this.props.actions.map(function (action) {
        return _this2.renderAction(action);
      });
    }
  }, {
    key: 'renderAction',
    value: function renderAction(action) {
      var counter = _react2.default.createElement(
        _style.Counter,
        null,
        action.count
      );
      return _react2.default.createElement(
        _style.Action,
        { key: action.id },
        _react2.default.createElement(
          _style.Countwrap,
          null,
          action.count > 1 && counter
        ),
        _react2.default.createElement(
          _style.InspectorContainer,
          null,
          _react2.default.createElement(_reactInspector2.default, {
            sortObjectKeys: true,
            showNonenumerable: false,
            name: action.data.name,
            data: action.data.args || action.data
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _style.Wrapper,
        null,
        _react2.default.createElement(
          _style.Actions,
          null,
          this.getActionData()
        ),
        _react2.default.createElement(
          _style.Button,
          { onClick: this.props.onClear },
          'Clear'
        )
      );
    }
  }]);
  return ActionLogger;
}(_react.Component);

ActionLogger.propTypes = {
  onClear: _propTypes2.default.func,
  actions: _propTypes2.default.array // eslint-disable-line react/forbid-prop-types
};
ActionLogger.defaultProps = {
  onClear: function onClear() {},
  actions: []
};

exports.default = ActionLogger;