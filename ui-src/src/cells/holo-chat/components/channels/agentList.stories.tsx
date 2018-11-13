import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'

import { agentListTest } from './agentList.test'
import { specs } from 'storybook-addon-specifications'

import AgentList from './agentList'
import * as Agents from '../../data/contactsBase64'

storiesOf('HoloChat/UserList', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Initially displays unfiltered list of all agents', () => {
    specs(() => agentListTest)
    return <AgentList users={Agents.agents}/>
  })
