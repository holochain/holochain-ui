'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPriorToFiber = exports.isValidFiberElement = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.flattendeep');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// return true if the element is renderable with react fiber
var isValidFiberElement = exports.isValidFiberElement = function isValidFiberElement(element) {
  return typeof element === 'string' || typeof element === 'number' || _react2.default.isValidElement(element);
};

var isPriorToFiber = exports.isPriorToFiber = function isPriorToFiber(version) {
  var _version$split = version.split('.'),
      _version$split2 = (0, _slicedToArray3.default)(_version$split, 1),
      majorVersion = _version$split2[0];

  return Number(majorVersion) < 16;
};

// accepts an element and return true if renderable else return false
var isReactRenderable = function isReactRenderable(element) {
  // storybook is running with a version prior to fiber,
  // run a simple check on the element
  if (isPriorToFiber(_react2.default.version)) {
    return _react2.default.isValidElement(element);
  }

  // the element is not an array, check if its a fiber renderable element
  if (!Array.isArray(element)) {
    return isValidFiberElement(element);
  }

  // the element is in fact a list of elements (array),
  // loop on its elements to see if its ok to render them
  var elementsList = element.map(isReactRenderable);

  // flatten the list of elements (possibly deep nested)
  var flatList = (0, _lodash2.default)(elementsList);

  // keep only invalid elements
  var invalidElements = flatList.filter(function (elementIsRenderable) {
    return elementIsRenderable === false;
  });

  // it's ok to render this list if there is no invalid elements inside
  return !invalidElements.length;
};

exports.default = isReactRenderable;