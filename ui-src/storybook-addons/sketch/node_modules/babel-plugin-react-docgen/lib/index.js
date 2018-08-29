'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      Class: function Class(path, state) {
        if (!(0, _isReactComponentClass2.default)(path)) {
          return;
        }
        if (!path.node.id) {
          return;
        }
        var className = path.node.id.name;

        if (!isExported(path, className, t)) {
          return;
        }
        injectReactDocgenInfo(className, path, state, this.file.code, t);
      },
      'CallExpression': function CallExpression(path, state) {
        var callee = path.node.callee;

        var objectName = _.get(callee, 'object.name') ? callee.object.name.toLowerCase() : null;
        var propertyName = _.get(callee, 'property.name') ? callee.property.name.toLowerCase() : null;
        var calleeName = _.get(callee, 'name') ? callee.name.toLowerCase() : null;

        // Detect `React.createClass()`
        var hasReactCreateClass = objectName === 'react' && propertyName === 'createclass';

        // Detect `createReactClass()`
        var hasCreateReactClass = calleeName === 'createreactclass';

        // Get React class name from variable declaration
        var className = _.get(path, 'parentPath.parent.declarations[0].id.name');

        // Detect `React.createElement()`
        var hasReactCreateElement = objectName === 'react' && propertyName === 'createelement';

        if (className && (hasReactCreateClass || hasCreateReactClass)) {
          injectReactDocgenInfo(className, path, state, this.file.code, t);
        }

        if (hasReactCreateElement) {
          var variableDeclaration = path.findParent(function (path) {
            return path.isVariableDeclaration();
          });

          if (variableDeclaration) {
            var elementClassName = variableDeclaration.node.declarations[0].id.name;
            if (!isExported(path, elementClassName, t)) {
              return;
            }

            injectReactDocgenInfo(elementClassName, path, state, this.file.code, t);
          }
        }
      },
      'FunctionDeclaration|FunctionExpression|ArrowFunctionExpression': function FunctionDeclarationFunctionExpressionArrowFunctionExpression(path, state) {
        if (!(0, _isStatelessComponent2.default)(path)) {
          return;
        }

        var node = path.node.type === 'FunctionDeclaration' ? path.node : path.parentPath.node;

        if (!node.id) {
          return;
        }
        var className = node.id.name;

        if (!isExported(path, className, t)) {
          return;
        }
        injectReactDocgenInfo(className, path, state, this.file.code, t);
      }
    }
  };
};

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _reactDocgen = require('react-docgen');

var reactDocs = _interopRequireWildcard(_reactDocgen);

var _isReactComponentClass = require('./isReactComponentClass');

var _isReactComponentClass2 = _interopRequireDefault(_isReactComponentClass);

var _isStatelessComponent = require('./isStatelessComponent');

var _isStatelessComponent2 = _interopRequireDefault(_isStatelessComponent);

var _path = require('path');

var p = _interopRequireWildcard(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function isExported(path, className, t) {
  var types = ['ExportDefaultDeclaration', 'ExportNamedDeclaration'];

  function findMostRightHandArgument() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var arg = args[0];
    if (t.isIdentifier(arg)) {
      return arg.name;
    } else if (t.isCallExpression(arg)) {
      return findMostRightHandArgument(arg.arguments);
    }
  }

  if (path.parentPath.node && types.some(function (type) {
    return path.parentPath.node.type === type;
  })) {
    return true;
  }

  var program = path.scope.getProgramParent().path;
  return program.get('body').some(function (path) {
    if (path.node.type === 'ExportNamedDeclaration' && path.node.specifiers && path.node.specifiers.length) {
      return className === path.node.specifiers[0].exported.name;
    } else if (path.node.type === 'ExportDefaultDeclaration') {
      var decl = path.node.declaration;
      if (t.isCallExpression(decl)) {
        return className === findMostRightHandArgument(decl.arguments);
      } else {
        return className === decl.name;
      }
      // Detect module.exports = className;
    } else if (path.node.type === 'ExpressionStatement') {
      var expr = path.node.expression;

      if (t.isAssignmentExpression(expr)) {
        var left = expr.left;
        var right = expr.right;

        var leftIsModuleExports = t.isMemberExpression(left) && t.isIdentifier(left.object) && t.isIdentifier(left.property) && left.object.name === 'module' && left.property.name === 'exports';

        var rightIsIdentifierClass = t.isIdentifier(right) && right.name === className;

        return leftIsModuleExports && rightIsIdentifierClass;
      }
    }
    return false;
  });
}

function alreadyVisited(program, t) {
  return program.node.body.some(function (node) {
    if (t.isExpressionStatement(node) && t.isAssignmentExpression(node.expression) && t.isMemberExpression(node.expression.left)) {
      return node.expression.left.property.name === '__docgenInfo';
    }
    return false;
  });
}

function injectReactDocgenInfo(className, path, state, code, t) {
  var program = path.scope.getProgramParent().path;

  if (alreadyVisited(program, t)) {
    return;
  }

  var docObj = {};
  try {
    var resolver = void 0;

    if (state.opts.resolver) {
      resolver = require('react-docgen').resolver[state.opts.resolver];
    }

    docObj = reactDocs.parse(code, resolver);

    if (!state.opts.includeMethods) {
      delete docObj.methods;
    }
  } catch (e) {
    return;
  }

  var docNode = buildObjectExpression(docObj, t);
  var docgenInfo = t.expressionStatement(t.assignmentExpression("=", t.memberExpression(t.identifier(className), t.identifier('__docgenInfo')), docNode));
  program.pushContainer('body', docgenInfo);
  injectDocgenGlobal(className, path, state, t);
}

function injectDocgenGlobal(className, path, state, t) {
  var program = path.scope.getProgramParent().path;

  if (!state.opts.DOC_GEN_COLLECTION_NAME) {
    return;
  }

  var globalName = state.opts.DOC_GEN_COLLECTION_NAME;
  var filePath = p.relative('./', p.resolve('./', path.hub.file.opts.filename));
  var globalNode = t.ifStatement(t.binaryExpression('!==', t.unaryExpression('typeof', t.identifier(globalName)), t.stringLiteral('undefined')), t.blockStatement([t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier(globalName), t.stringLiteral(filePath), true), t.objectExpression([t.objectProperty(t.identifier('name'), t.stringLiteral(className)), t.objectProperty(t.identifier('docgenInfo'), t.memberExpression(t.identifier(className), t.identifier('__docgenInfo'))), t.objectProperty(t.identifier('path'), t.stringLiteral(filePath))])))]));
  program.pushContainer('body', globalNode);
}

function buildObjectExpression(obj, t) {
  if (_.isPlainObject(obj)) {
    var children = [];
    for (var key in obj) {
      if (!obj.hasOwnProperty(key) || _.isUndefined(obj[key])) continue;
      children.push(t.objectProperty(t.stringLiteral(key), buildObjectExpression(obj[key], t)));
    }
    return t.objectExpression(children);
  } else if (_.isString(obj)) {
    return t.stringLiteral(obj);
  } else if (_.isBoolean(obj)) {
    return t.booleanLiteral(obj);
  } else if (_.isNumber(obj)) {
    return t.numericLiteral(obj);
  } else if (_.isArray(obj)) {
    var _children = [];
    obj.forEach(function (val) {
      _children.push(buildObjectExpression(val, t));
    });
    return t.ArrayExpression(_children);
  } else if (_.isNull(obj)) {
    return t.nullLiteral();
  }
}