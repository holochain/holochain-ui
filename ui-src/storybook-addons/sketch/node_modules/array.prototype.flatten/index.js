'use strict';

var define = require('define-properties');
var bind = require('function-bind');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var polyfill = getPolyfill();
var shim = require('./shim');

var boundFlatten = bind.call(Function.call, polyfill);

define(boundFlatten, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundFlatten;
