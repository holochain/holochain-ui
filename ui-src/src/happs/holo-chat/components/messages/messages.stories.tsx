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
import * as Agents from '../../data/contactsBase64'

configure({ adapter: new Adapter() })
let store = CreateStore()

storiesOf('HoloChat/Messages', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Message Stream Desktop', withNotes(streamMessagesDesktop)(() => {
    return <Messages messages={constants.messages} members={Agents.agents} isMobile={false} channelName={'Message Stream Desktop'} />
  }))
  .add('Message Stream Mobile', withNotes(streamMessagesMobile)(() => {
    return <Messages messages={constants.messages} members={Agents.agents} isMobile={true} channelName={'Message Stream Mobile'} />
  }))
