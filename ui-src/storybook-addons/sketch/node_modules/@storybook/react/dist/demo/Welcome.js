'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _react3 = require('@storybook/addon-links/react');

var _react4 = _interopRequireDefault(_react3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = _glamorous2.default.article({
  margin: 15,
  maxWidth: 600,
  lineHeight: 1.4,
  fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif'
});

var Title = _glamorous2.default.h1({});

var Note = _glamorous2.default.p({
  opacity: 0.5
});

var InlineCode = _glamorous2.default.code({
  fontSize: 15,
  fontWeight: 600,
  padding: '2px 5px',
  border: '1px solid #eae9e9',
  borderRadius: 4,
  backgroundColor: '#f3f2f2',
  color: '#3a3a3a'
});

var Link = _glamorous2.default.a({
  color: '#1474f3',
  textDecoration: 'none',
  borderBottom: '1px solid #1474f3',
  paddingBottom: 2
});

var NavButton = (0, _glamorous2.default)(Link.withComponent('button'))({
  borderTop: 'none',
  borderRight: 'none',
  borderLeft: 'none',
  backgroundColor: 'transparent',
  padding: 0,
  cursor: 'pointer',
  font: 'inherit'
});
var StoryLink = Link.withComponent(_react4.default);

var Welcome = function Welcome(props) {
  return _react2.default.createElement(
    Main,
    null,
    _react2.default.createElement(
      Title,
      null,
      'Welcome to storybook'
    ),
    _react2.default.createElement(
      'p',
      null,
      'This is a UI component dev environment for your app.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'We\'ve added some basic stories inside the ',
      _react2.default.createElement(
        InlineCode,
        null,
        'src/stories'
      ),
      ' directory.',
      _react2.default.createElement('br', null),
      'A story is a single state of one or more UI components. You can have as many stories as you want.',
      _react2.default.createElement('br', null),
      '(Basically a story is like a visual test case.)'
    ),
    _react2.default.createElement(
      'p',
      null,
      'See these sample',
      ' ',
      props.showApp ? _react2.default.createElement(
        NavButton,
        { onClick: props.showApp },
        'stories'
      ) : _react2.default.createElement(
        StoryLink,
        { kind: props.showKind, story: props.showStory },
        'stories'
      ),
      ' ',
      'for a component called ',
      _react2.default.createElement(
        InlineCode,
        null,
        'Button'
      ),
      '.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Just like that, you can add your own components as stories.',
      _react2.default.createElement('br', null),
      'You can also edit those components and see changes right away.',
      _react2.default.createElement('br', null),
      '(Try editing the ',
      _react2.default.createElement(
        InlineCode,
        null,
        'Button'
      ),
      ' stories located at',
      ' ',
      _react2.default.createElement(
        InlineCode,
        null,
        'src/stories/index.js'
      ),
      '.)'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Usually we create stories with smaller UI components in the app.',
      _react2.default.createElement('br', null),
      'Have a look at the',
      ' ',
      _react2.default.createElement(
        Link,
        {
          href: 'https://storybook.js.org/basics/writing-stories',
          target: '_blank',
          rel: 'noopener noreferrer'
        },
        'Writing Stories'
      ),
      ' ',
      'section in our documentation.'
    ),
    _react2.default.createElement(
      Note,
      null,
      _react2.default.createElement(
        'b',
        null,
        'NOTE:'
      ),
      _react2.default.createElement('br', null),
      'Have a look at the ',
      _react2.default.createElement(
        InlineCode,
        null,
        '.storybook/webpack.config.js'
      ),
      ' to add webpack loaders and plugins you are using in this project.'
    )
  );
};

Welcome.displayName = 'Welcome';
Welcome.propTypes = {
  showApp: _propTypes2.default.func,
  showKind: _propTypes2.default.string,
  showStory: _propTypes2.default.string
};
Welcome.defaultProps = {
  showApp: null,
  showKind: null,
  showStory: null
};

exports.default = Welcome;