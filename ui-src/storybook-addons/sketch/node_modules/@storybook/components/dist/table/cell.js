'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.th = exports.td = undefined;

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamicStyles = function dynamicStyles(props) {
  var styles = [];

  if (props.bordered) {
    styles.push({
      border: '1px solid #ccc'
    });
  }

  if (props.code) {
    styles.push({
      whiteSpace: 'nowrap',
      fontFamily: 'Monaco, Consolas, "Courier New", monospace'
    });
  }

  return styles;
};

var styles = {
  padding: '2px 6px'
};

var td = exports.td = _glamorous2.default.td(styles, dynamicStyles);
var th = exports.th = _glamorous2.default.th(styles, dynamicStyles);