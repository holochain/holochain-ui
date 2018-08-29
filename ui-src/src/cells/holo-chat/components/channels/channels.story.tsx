import * as React from 'react'
// import {Provider} from 'react-redux'
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from 'react-router'
import { withNotes } from '@storybook/addon-notes'
import {configure} from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import newChannel from './newChannel.md'
import filterAgents from './filterAgents.md'
import selectAgent from './selectAgent.md'
import newChat from './newChat.md'
// import CreateStore from '../../../../store'
// import  * as constants from '../../constants'
// import{Message as MessageType} from '../../types/message'

import {specs} from 'storybook-addon-specifications'
import { tests } from './channels.test'

configure({adapter: new Adapter()})
// let store = CreateStore()

function StartComponent () {
    return (
      <div>Starting point</div>
    )
}

storiesOf('HoloChat/Channels', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  // .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Start a new Channel', withNotes(newChannel) (() => {
    specs(() => tests)
      return <StartComponent />
  }))
  .add('Filter the list', withNotes(filterAgents) (() => {
      return <StartComponent />
  }))
  .add('Select someone to chat to', withNotes(selectAgent) (() => {
      return <StartComponent />
  }))
  .add('A new chat starts', withNotes(newChat) (() => {
    specs(() => tests)
    return <StartComponent />
  }))
