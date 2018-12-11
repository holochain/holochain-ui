import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withNotes } from '@storybook/addon-notes'
import { MemoryRouter } from 'react-router'
import { specs } from 'storybook-addon-specifications'
import newChat from './newChat.md'
import { newChatTests } from './newChat.test'
import NewChannel from './newChannel'
import * as Agents from '../../data/contactsBase64'
import newChannel from './newChannel.md'
import { agentListTest } from './agentList.test'

storiesOf('HoloChat/Channels', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('New Public Channel', withNotes(newChat)(() => {
    specs(() => newChatTests)
    return <NewChannel members={Agents.agents} open={true} isPublic='true' getAllMembers={jest.fn(() => Promise.resolve('Get Members'))} />
  }))
  .add('Filterable/Selectable list of members', withNotes(newChannel)(() => {
    specs(() => agentListTest)
    return <NewChannel members={Agents.agents} open={true} getAllMembers={jest.fn(() => Promise.resolve('Get Members'))} />
  }))
