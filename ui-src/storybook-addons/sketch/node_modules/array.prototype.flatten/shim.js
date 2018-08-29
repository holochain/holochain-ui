'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimFlatten() {
	var polyfill = getPolyfill();
	define(
		Array.prototype,
		{ flatten: polyfill },
		{ flatten: function () { return Array.prototype.flatten !== polyfill; } }
	);
	return polyfill;
};
