import { configure } from '@storybook/react'
import {storiesOf, action, linkTo, specs, describe, it} from "./facade-mocha";

const stories = require.context('../src/cells', true, /story\.js$/)

function loadStories () {
  global.storiesOf = storiesOf;
  global.action = action;
  global.linkTo = linkTo;
  global.specs = specs;
  global.describe = describe;
  global.it = it;
  stories.keys().forEach(stories)
}

configure(loadStories, module)
