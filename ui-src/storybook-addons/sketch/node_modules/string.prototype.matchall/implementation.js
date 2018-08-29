'use strict';

var ES = require('es-abstract');
var hasSymbols = require('has-symbols')();

var MatchAllIterator = require('./helpers/MatchAllIterator');

module.exports = function matchAll(regexp) {
	var O = ES.RequireObjectCoercible(this);

	if (typeof regexp !== 'undefined' && regexp !== null) {
		var matcher;
		if (hasSymbols && typeof Symbol.matchAll === 'symbol') {
			matcher = ES.GetMethod(regexp, Symbol.matchAll);
		}
		if (typeof matcher !== 'undefined') {
			return ES.Call(matcher, regexp, [O]);
		}
	}

	return MatchAllIterator(regexp, O);
};
