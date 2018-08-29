'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _glamorous2.default.button((0, _extends3.default)({}, _theme.baseFonts, {
  border: 'none',
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.2)',
  backgroundColor: 'rgb(255, 255, 255)',
  padding: '4px 10px 7px',
  borderRadius: 4,
  cursor: 'pointer',
  transition: 'box-shadow 0.15s ease-out',
  ':hover': {
    transition: 'background-color 0.15s ease-out',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3)'
  },
  ':focus': {
    transition: 'background-color 0.15s ease-out',
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.3)'
  },
  ':active': {
    transition: 'none',
    backgroundColor: 'rgb(247, 247, 247)'
  }
})).withProps({ type: 'button' });