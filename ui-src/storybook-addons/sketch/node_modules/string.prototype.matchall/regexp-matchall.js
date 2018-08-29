'use strict';

var ES = require('es-abstract');
var MatchAllIterator = require('./helpers/MatchAllIterator');

var regexMatchAll = function SymbolMatchAll(string) {
	var R = this;
	if (ES.Type(R) !== 'Object') {
		throw new TypeError('"this" value must be an Object');
	}
	return MatchAllIterator(R, string);
};

var defineP = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

if (defineP && gOPD) {
	var desc = gOPD(regexMatchAll, 'name');
	if (desc && desc.configurable) {
		defineP(regexMatchAll, 'name', { value: '[Symbol.matchAll]' });
	}
}

module.exports = regexMatchAll;
