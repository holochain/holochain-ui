import React from 'react'
import {Provider} from 'react-redux'
import {storiesOf} from '@storybook/react'
import { MemoryRouter } from 'react-router'
import {action, decorateAction} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Messages from './messages'
import listMessages from './listMessages.md'
import expect from 'expect'
import CreateStore from '../../../../store'
import  * as constants from '../../constants.js'

configure({adapter: new Adapter()})
let store = CreateStore()


storiesOf('HoloChat/Messages', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  // .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Feed', withNotes(listMessages) (() => {
      return getMessages(constants.messages)
  }))

function getMessages(messages) {
  return (<Provider store={store}><Messages messages={messages} /></Provider>)
}
