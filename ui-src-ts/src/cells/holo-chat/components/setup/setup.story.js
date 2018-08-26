import React from 'react'
import {Provider} from 'react-redux'
import {storiesOf} from '@storybook/react'
import { MemoryRouter } from 'react-router'
import {action, decorateAction} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Setup from './setup'
import expect from 'expect'
import setupNotes from './setup.md'
configure({adapter: new Adapter()})

import CreateStore from '../../../../store'

let store = CreateStore()


storiesOf('HoloChat/Setup', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Setup Step 1', withNotes(setupNotes) (() => {
    return getSetup()
  }))

function getSetup() {
  return (<Provider store={store}><Setup /></Provider>)
}
