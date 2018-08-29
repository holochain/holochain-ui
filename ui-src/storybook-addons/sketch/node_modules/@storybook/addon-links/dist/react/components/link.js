'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _components = require('@storybook/components');

var _preview = require('../../preview');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkTo = function (_PureComponent) {
  (0, _inherits3.default)(LinkTo, _PureComponent);

  function LinkTo() {
    var _ref;

    (0, _classCallCheck3.default)(this, LinkTo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = LinkTo.__proto__ || (0, _getPrototypeOf2.default)(LinkTo)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      href: '/'
    };

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(LinkTo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateHref(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.kind !== this.props.kind || props.story !== this.props.story) {
        this.updateHref(props);
      }
    }
  }, {
    key: 'updateHref',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
        var href;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _preview.hrefTo)(props.kind, props.story);

              case 2:
                href = _context.sent;

                this.setState({ href: href });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateHref(_x) {
        return _ref2.apply(this, arguments);
      }

      return updateHref;
    }()
  }, {
    key: 'handleClick',
    value: function handleClick() {
      (0, _preview.openLink)(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          kind = _props.kind,
          story = _props.story,
          rest = (0, _objectWithoutProperties3.default)(_props, ['kind', 'story']);


      return _react2.default.createElement(_components.RoutedLink, (0, _extends3.default)({ href: this.state.href, onClick: this.handleClick }, rest));
    }
  }]);
  return LinkTo;
}(_react.PureComponent);

exports.default = LinkTo;


LinkTo.defaultProps = {
  kind: null,
  story: null
};

LinkTo.propTypes = {
  kind: _propTypes2.default.string,
  story: _propTypes2.default.string
};