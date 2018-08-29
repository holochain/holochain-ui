'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LEFT_BUTTON = 0;
// Cmd/Ctrl/Shift/Alt + Click should trigger default browser behaviour. Same applies to non-left clicks
var isPlainLeftClick = function isPlainLeftClick(e) {
  return e.button === LEFT_BUTTON && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;
};

var wrapOnClick = function wrapOnClick(fn) {
  return function (e) {
    return isPlainLeftClick(e) ? e.preventDefault() || fn(e) : false;
  };
};

var RoutedLink = function (_React$Component) {
  (0, _inherits3.default)(RoutedLink, _React$Component);

  function RoutedLink(props) {
    var _ref;

    (0, _classCallCheck3.default)(this, RoutedLink);

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = RoutedLink.__proto__ || (0, _getPrototypeOf2.default)(RoutedLink)).call.apply(_ref, [this].concat([props].concat(rest))));

    var onClick = props.onClick;

    _this.onClick = onClick ? wrapOnClick(onClick) : undefined;
    return _this;
  }

  (0, _createClass3.default)(RoutedLink, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(_ref2) {
      var onClick = _ref2.onClick;

      this.onClick = wrapOnClick(onClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var onClick = this.onClick;
      var _props = this.props,
          href = _props.href,
          children = _props.children,
          rest = (0, _objectWithoutProperties3.default)(_props, ['href', 'children']);

      var props = (0, _extends3.default)({ href: href }, rest, { onClick: onClick });
      return _react2.default.createElement(
        'a',
        props,
        children
      );
    }
  }]);
  return RoutedLink;
}(_react2.default.Component);

exports.default = RoutedLink;


RoutedLink.defaultProps = {
  onClick: null,
  href: '#',
  children: null
};

RoutedLink.propTypes = {
  onClick: _propTypes2.default.func,
  href: _propTypes2.default.string,
  children: _propTypes2.default.node
};