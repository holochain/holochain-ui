import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withNotes } from '@storybook/addon-notes'
import { MemoryRouter } from 'react-router'
import { specs } from 'storybook-addon-specifications'
import newChat from './newChat.md'
import { newChatTests } from './newChat.test'
import NewStream from './newStream'
import * as Agents from '../../data/contactsBase64'
import newStream from './newStream.md'
import { agentListTest } from './agentList.test'

storiesOf('HoloChat/Streams', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('New Public Stream', withNotes(newChat)(() => {
    specs(() => newChatTests)
    return <NewStream members={Agents.agents} open={true} isPublic={true} getAllMembers={jest.fn(() => Promise.resolve('Get Members'))} />
  }))
  .add('New Direct Message', withNotes(newChat)(() => {
    specs(() => newChatTests)
    return <NewStream members={Agents.agents} open={true} isPublic={false} getAllMembers={jest.fn(() => Promise.resolve('Get Members'))} />
  }))
  .add('Filterable/Selectable list of members', withNotes(newStream)(() => {
    specs(() => agentListTest)
    return <NewStream members={Agents.agents} open={true} getAllMembers={jest.fn(() => Promise.resolve('Get Members'))} />
  }))
