import * as React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { withNotes } from '@storybook/addon-notes'
import listChannels from './listChannels.md'
import newChannel from './newChannel.md'
import filterAgents from './filterAgents.md'
import selectAgent from './selectAgent.md'
import newChat from './newChat.md'
import CreateStore from '../../../../store'
import Channels from './channels'
import NewChannel from './newChannel'
import { specs } from 'storybook-addon-specifications'
import { newChannelTests } from './newChannel.test'
import { filterAgentsTests } from './filterAgents.test'
import { selectAgentTests } from './selectAgent.test'
import { newChatTests } from './newChat.test'
import { channelsTests } from './channels.test'
import { channelData } from '../../data/channelData'
import * as Agents from '../../data/contactsBase64'

let store = CreateStore()

function StartComponent () {
  return (
      <h1>Awesomeness on the way!</h1>
  )
}

storiesOf('HoloChat/Channels', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('List my Channels', withNotes(listChannels)(() => {
    specs(() => channelsTests)
    return <Provider store={store}><Channels channels={channelData} /></Provider>
  }))
  .add('Start a new Channel', withNotes(newChannel)(() => {
    specs(() => newChannelTests)
    return <NewChannel open={true} users={Agents.agents}/>
  }))
  .add('Filter the list', withNotes(filterAgents)(() => {
    specs(() => filterAgentsTests)
    return <StartComponent />
  }))
  .add('Add people to the Channel', withNotes(selectAgent)(() => {
    specs(() => selectAgentTests)
    return <StartComponent />
  }))
  .add('A new chat starts', withNotes(newChat)(() => {
    specs(() => newChatTests)
    return <StartComponent />
  }))
