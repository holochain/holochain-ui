import * as React from 'react'
import {Provider} from 'react-redux'
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from 'react-router'
import { withNotes } from '@storybook/addon-notes'
import {configure} from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import Messages from './messages'
import listMessages from './listMessages.md'
import reply from './reply.md'
import CreateStore from '../../../../store'
import  * as constants from '../../constants'
import{Message as MessageType} from '../../types/message'


configure({adapter: new Adapter()})
let store = CreateStore()

function StartComponent (props: any) {
    return (
      <h1>Start </h1>
    )
}

storiesOf('HoloChat/Messages', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  // .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Feed', withNotes(listMessages) (() => {
      return getMessages(constants.messages)
  }))
  .add('Reply', withNotes(reply) (() => {
      return <StartComponent />
  }))

function getMessages(messages: Array<MessageType>) {
  return (<Provider store={store}><Messages messages={messages} /></Provider>)
}
