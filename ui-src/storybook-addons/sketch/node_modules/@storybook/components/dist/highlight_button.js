'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _glamorous2.default.button({
  border: '1px solid rgba(0, 0, 0, 0)',
  font: 'inherit',
  background: 'none',
  boxShadow: 'none',
  padding: 0,
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    border: '1px solid #ccc'
  }
}, function (props) {
  var styles = [];

  if (props.highlight) {
    styles.push({
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      border: '1px solid #ccc'
    });
  }

  return styles;
});