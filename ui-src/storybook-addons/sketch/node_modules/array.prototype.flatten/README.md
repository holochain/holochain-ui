# array.prototype.flatten <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ESnext spec-compliant `Array.prototype.flatten` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the proposed [spec](https://tc39.github.io/proposal-flatMap/).

Because `Array.prototype.flatten` depends on a receiver (the `this` value), the main export takes the array to operate on as the first argument.

## Getting started

```sh
npm install --save array.prototype.flatten
```

## Usage/Examples

```js
var flatten = require('array.prototype.flatten');
var assert = require('assert');

var arr = [1, [2], [], 3, [[4]]];

assert.deepEqual(flatten(arr, 1), [1, 2, 3, [4]]);
```

```js
var flatten = require('array.prototype.flatten');
var assert = require('assert');
/* when Array#flatten is not present */
delete Array.prototype.flatten;
var shimmedFlatten = flatten.shim();

assert.equal(shimmedFlatten, flatten.getPolyfill());
assert.deepEqual(arr.flatten(), flatten(arr));
```

```js
var flatten = require('array.prototype.flatten');
var assert = require('assert');
/* when Array#flatten is present */
var shimmedIncludes = flatten.shim();

var mapper = function (x) { return [x, 1]; };

assert.equal(shimmedIncludes, Array.prototype.flatten);
assert.deepEqual(arr.flatten(mapper), flatten(arr, mapper));
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/array.prototype.flatten
[npm-version-svg]: http://versionbadg.es/es-shims/Array.prototype.flatten.svg
[travis-svg]: https://travis-ci.org/es-shims/Array.prototype.flatten.svg
[travis-url]: https://travis-ci.org/es-shims/Array.prototype.flatten
[deps-svg]: https://david-dm.org/es-shims/Array.prototype.flatten.svg
[deps-url]: https://david-dm.org/es-shims/Array.prototype.flatten
[dev-deps-svg]: https://david-dm.org/es-shims/Array.prototype.flatten/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Array.prototype.flatten#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/array.prototype.flatten.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/array.prototype.flatten.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/array.prototype.flatten.svg
[downloads-url]: http://npm-stat.com/charts.html?package=array.prototype.flatten
