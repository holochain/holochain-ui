'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n        Did you forget to return the React element from the story?\n        Use "() => (<MyComp/>)" or "() => { return <MyComp/>; }" when defining the story.\n      '], ['\n        Did you forget to return the React element from the story?\n        Use "() => (<MyComp/>)" or "() => { return <MyComp/>; }" when defining the story.\n      ']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n         Seems like you are not returning a correct React element from the story.\n         Could you double check that?\n       '], ['\n         Seems like you are not returning a correct React element from the story.\n         Could you double check that?\n       ']); /* global document */

exports.renderError = renderError;
exports.renderException = renderException;
exports.renderMain = renderMain;
exports.default = renderPreview;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _commonTags = require('common-tags');

var _clientLogger = require('@storybook/client-logger');

var _element_check = require('./element_check');

var _element_check2 = _interopRequireDefault(_element_check);

var _error_display = require('./error_display');

var _error_display2 = _interopRequireDefault(_error_display);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check whether we're running on node/browser
var isBrowser = typeof window !== 'undefined';

var rootEl = null;
var previousKind = '';
var previousStory = '';
var previousRevision = -1;

if (isBrowser) {
  rootEl = document.getElementById('root');
}

function renderError(error) {
  var properError = new Error(error.title);
  properError.stack = error.description;

  var redBox = _react2.default.createElement(_error_display2.default, { error: properError });
  _reactDom2.default.render(redBox, rootEl);
}

function renderException(error) {
  // We always need to render redbox in the mainPage if we get an error.
  // Since this is an error, this affects to the main page as well.
  var realError = new Error(error.message);
  realError.stack = error.stack;
  var redBox = _react2.default.createElement(_error_display2.default, { error: realError });
  _reactDom2.default.render(redBox, rootEl);

  // Log the stack to the console. So, user could check the source code.
  _clientLogger.logger.error(error.stack);
}

function renderMain(data, storyStore, forceRender) {
  if (storyStore.size() === 0) return null;

  var NoPreview = function NoPreview() {
    return _react2.default.createElement(
      'p',
      null,
      'No Preview Available!'
    );
  };
  var noPreview = _react2.default.createElement(NoPreview, null);
  var selectedKind = data.selectedKind,
      selectedStory = data.selectedStory;


  var revision = storyStore.getRevision();
  var story = storyStore.getStory(selectedKind, selectedStory);
  if (!story) {
    _reactDom2.default.render(noPreview, rootEl);
    return null;
  }

  // Unmount the previous story only if selectedKind or selectedStory has changed.
  // renderMain() gets executed after each action. Actions will cause the whole
  // story to re-render without this check.
  //    https://github.com/storybooks/react-storybook/issues/116
  // However, we do want the story to re-render if the store itself has changed
  // (which happens at the moment when HMR occurs)
  if (!forceRender && revision === previousRevision && selectedKind === previousKind && previousStory === selectedStory) {
    return null;
  }

  // We need to unmount the existing set of components in the DOM node.
  // Otherwise, React may not recrease instances for every story run.
  // This could leads to issues like below:
  //    https://github.com/storybooks/react-storybook/issues/81
  previousRevision = revision;
  previousKind = selectedKind;
  previousStory = selectedStory;
  _reactDom2.default.unmountComponentAtNode(rootEl);

  var context = {
    kind: selectedKind,
    story: selectedStory
  };

  var element = story(context);

  if (!element) {
    var error = {
      title: 'Expecting a React element from the story: "' + selectedStory + '" of "' + selectedKind + '".',
      description: (0, _commonTags.stripIndents)(_templateObject)
    };
    return renderError(error);
  }

  if (!(0, _element_check2.default)(element)) {
    var _error = {
      title: 'Expecting a valid React element from the story: "' + selectedStory + '" of "' + selectedKind + '".',
      description: (0, _commonTags.stripIndents)(_templateObject2)
    };
    return renderError(_error);
  }

  _reactDom2.default.render(element, rootEl);
  return null;
}

function renderPreview(_ref) {
  var reduxStore = _ref.reduxStore,
      storyStore = _ref.storyStore;
  var forceRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var state = reduxStore.getState();
  if (state.error) {
    return renderException(state.error);
  }

  try {
    return renderMain(state, storyStore, forceRender);
  } catch (ex) {
    return renderException(ex);
  }
}