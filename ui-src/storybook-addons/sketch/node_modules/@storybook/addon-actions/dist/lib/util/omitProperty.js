'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omitProperty;
function omitProperty(name) {
  return name.startsWith('__') || name.startsWith('STORYBOOK_');
}