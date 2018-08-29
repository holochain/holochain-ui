'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _routed_link = require('./routed_link');

var _routed_link2 = _interopRequireDefault(_routed_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _glamorous2.default)(_routed_link2.default, { rootEl: 'a' })({
  display: 'block',
  color: '#828282',
  textDecoration: 'none',
  fontSize: '13px',
  lineHeight: '16px',
  padding: '1px 5px 4px',
  marginLeft: '5px',
  position: 'relative',
  zIndex: 1
}, function (_ref) {
  var active = _ref.active;
  return active && {
    color: 'inherit',
    fontWeight: 'bold',
    backgroundColor: '#EEE',
    zIndex: 0
  };
});