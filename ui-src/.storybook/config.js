import { configure } from '@storybook/react'
const stories = require.context('../src/cells', true, /story\.js$/)

function loadStories () {
  stories.keys().forEach(stories)
}

configure(loadStories, module)
