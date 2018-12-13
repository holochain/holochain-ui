import * as React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { withNotes } from '@storybook/addon-notes'
import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import Messages from './messages'
import streamMessagesDesktop from './streamMessagesDesktop.md'
import streamMessagesMobile from './streamMessagesMobile.md'
import CreateStore from '../../../../store'
import * as constants from '../../constants'
import { Message as MessageType } from '../../types/model/message'
import * as Agents from '../../data/contactsBase64'

configure({ adapter: new Adapter() })
let store = CreateStore()

function StartComponent () {
  return (
      <h1>Start </h1>
  )
}

storiesOf('HoloChat/Messages', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  // .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Stream desktop', withNotes(streamMessagesDesktop)(() => {
    return getMessages(constants.messages)
  }))
  .add('Stream mobile', withNotes(streamMessagesMobile)(() => {
    return getMessages(constants.messages)
  }))

function getMessages (messages: Array<MessageType>) {
  return (<Provider store={store}><Messages messages={messages} members={Agents.agents} /></Provider>)
}
