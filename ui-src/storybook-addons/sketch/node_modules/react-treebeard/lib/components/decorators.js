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

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _velocityReact = require('velocity-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading(_ref) {
    var style = _ref.style;

    return _react2.default.createElement(
        'div',
        { style: style },
        'loading...'
    );
};
Loading.propTypes = {
    style: _propTypes2.default.object
};

var Toggle = function Toggle(_ref2) {
    var style = _ref2.style;
    var height = style.height,
        width = style.width;

    var midHeight = height * 0.5;
    var points = '0,0 0,' + height + ' ' + width + ',' + midHeight;

    return _react2.default.createElement(
        'div',
        { style: style.base },
        _react2.default.createElement(
            'div',
            { style: style.wrapper },
            _react2.default.createElement(
                'svg',
                { height: height, width: width },
                _react2.default.createElement('polygon', { points: points,
                    style: style.arrow })
            )
        )
    );
};
Toggle.propTypes = {
    style: _propTypes2.default.object
};

var Header = function Header(_ref3) {
    var node = _ref3.node,
        style = _ref3.style;

    return _react2.default.createElement(
        'div',
        { style: style.base },
        _react2.default.createElement(
            'div',
            { style: style.title },
            node.name
        )
    );
};
Header.propTypes = {
    style: _propTypes2.default.object,
    node: _propTypes2.default.object.isRequired
};

var Container = (0, _radium2.default)(_class = function (_React$Component) {
    (0, _inherits3.default)(Container, _React$Component);

    function Container() {
        (0, _classCallCheck3.default)(this, Container);
        return (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).apply(this, arguments));
    }

    (0, _createClass3.default)(Container, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                style = _props.style,
                decorators = _props.decorators,
                terminal = _props.terminal,
                onClick = _props.onClick,
                node = _props.node;


            return _react2.default.createElement(
                'div',
                { onClick: onClick,
                    ref: function ref(_ref4) {
                        return _this2.clickableRef = _ref4;
                    },
                    style: style.container },
                !terminal ? this.renderToggle() : null,
                _react2.default.createElement(decorators.Header, { node: node,
                    style: style.header })
            );
        }
    }, {
        key: 'renderToggle',
        value: function renderToggle() {
            var _this3 = this;

            var animations = this.props.animations;


            if (!animations) {
                return this.renderToggleDecorator();
            }

            return _react2.default.createElement(
                _velocityReact.VelocityComponent,
                { animation: animations.toggle.animation,
                    duration: animations.toggle.duration,
                    ref: function ref(_ref5) {
                        return _this3.velocityRef = _ref5;
                    } },
                this.renderToggleDecorator()
            );
        }
    }, {
        key: 'renderToggleDecorator',
        value: function renderToggleDecorator() {
            var _props2 = this.props,
                style = _props2.style,
                decorators = _props2.decorators;


            return _react2.default.createElement(decorators.Toggle, { style: style.toggle });
        }
    }]);
    return Container;
}(_react2.default.Component)) || _class;

Container.propTypes = {
    style: _propTypes2.default.object.isRequired,
    decorators: _propTypes2.default.object.isRequired,
    terminal: _propTypes2.default.bool.isRequired,
    onClick: _propTypes2.default.func.isRequired,
    animations: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]).isRequired,
    node: _propTypes2.default.object.isRequired
};

exports.default = {
    Loading: Loading,
    Toggle: Toggle,
    Header: Header,
    Container: Container
};