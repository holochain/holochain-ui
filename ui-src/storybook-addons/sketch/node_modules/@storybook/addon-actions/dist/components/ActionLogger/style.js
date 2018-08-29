'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = exports.InspectorContainer = exports.Countwrap = exports.Counter = exports.Button = exports.Action = exports.Actions = undefined;

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _components = require('@storybook/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Actions = exports.Actions = _glamorous2.default.pre({
  flex: 1,
  margin: 0,
  padding: '8px 2px 20px 0',
  overflowY: 'auto',
  color: '#666'
});

var Action = exports.Action = _glamorous2.default.div({
  display: 'flex',
  padding: '3px 3px 3px 0',
  borderLeft: '5px solid white',
  borderBottom: '1px solid #fafafa',
  transition: 'all 0.1s',
  alignItems: 'start'
});

var Button = exports.Button = (0, _glamorous2.default)(_components.Button)({
  position: 'absolute',
  bottom: 0,
  right: 0,
  borderRadius: '4px 0 0 0',
  textTransform: 'uppercase',
  letterSpacing: 1,
  paddingTop: 5,
  paddingBootom: 5
});

var Counter = exports.Counter = _glamorous2.default.div({
  margin: '0 5px 0 5px',
  backgroundColor: '#777777',
  color: '#ffffff',
  padding: '1px 5px',
  borderRadius: '20px'
});

var Countwrap = exports.Countwrap = _glamorous2.default.div({
  paddingBottom: 2
});

var InspectorContainer = exports.InspectorContainer = _glamorous2.default.div({
  flex: 1,
  padding: '0 0 0 5px'
});

var Wrapper = exports.Wrapper = _glamorous2.default.div({
  flex: 1,
  display: 'flex',
  position: 'relative'
});