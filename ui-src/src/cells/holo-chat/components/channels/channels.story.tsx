import * as React from 'react'
// import {Provider} from 'react-redux'
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from 'react-router'
import { withNotes } from '@storybook/addon-notes'
import {configure} from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import listChannels from './listChannels.md'
import newChannel from './newChannel.md'
import filterAgents from './filterAgents.md'
import selectAgent from './selectAgent.md'
import newChat from './newChat.md'
// import CreateStore from '../../../../store'
// import  * as constants from '../../constants'
// import{Message as MessageType} from '../../types/message'
// import Channels from './channels'
import NewChannel from './newChannel'

import {specs} from 'storybook-addon-specifications'
import { newChannelTests } from './newChannel.test'
import { filterAgentsTests } from './filterAgents.test'
import { selectAgentTests } from './selectAgent.test'
import { newChatTests } from './newChat.test'
import { channelsTests } from './channels.test'
// import channelData from '../../data/channels.json'

// const channelData = [
//   {
//     "name": "Celestial",
//     "channel": "philip_celestial",
//     "avatar": "ccxxoo.png",
//             "members": [
//                 {
//                   "name": "Celestial",
//                   "avatar": "ccxxoo.png"
//                 },
//                 {
//                   "name": "Philip",
//                   "avatar": "philipbeadle.png"
//                 }
//             ]
//   },
//   {
//     "name": "Micah",
//     "channel": "philip_micah",
//     "avatar": "micah_notify.png",
//             "members": [
//                 {
//                   "name": "Micah",
//                   "avatar": "micah.jefferson.png"
//                 },
//                 {
//                   "name": "Philip",
//                   "avatar": "philipbeadle.png"
//                 }
//             ]
//   },
//   {
//     "name": "Jean",
//     "channel": "philip_jean",
//     "avatar": "jeanmrussell.png",
//             "members": [
//                 {
//                   "name": "Jean",
//                   "avatar": "jeanmrussell.png"
//                 },
//                 {
//                   "name": "Philip",
//                   "avatar": "philipbeadle.png"
//                 }
//             ]
//   },
//   {
//     "name": "Jean & Micah",
//     "channel": "philip_jean_micah",
//     "avatar": "holochain-circle-lrg.png",
//             "members": [
//                 {
//                   "name": "Micah",
//                   "avatar": "micah.jefferson.png"
//                 },
//                 {
//                   "name": "Jean",
//                   "avatar": "jeanmrussell.png"
//                 },
//                 {
//                   "name": "Philip",
//                   "avatar": "philipbeadle.png"
//                 }
//             ]
//   }
// ]


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
  .add('List my Channels', withNotes(listChannels) (() => {
    specs(() => channelsTests)
      return <StartComponent />
  }))
  .add('Start a new Channel', withNotes(newChannel) (() => {
    specs(() => newChannelTests)
      return <NewChannel />
  }))
  .add('Filter the list', withNotes(filterAgents) (() => {
    specs(() => filterAgentsTests)
      return <StartComponent />
  }))
  .add('Add people to the Channel', withNotes(selectAgent) (() => {
    specs(() => selectAgentTests)
      return <StartComponent />
  }))
  .add('A new chat starts', withNotes(newChat) (() => {
    specs(() => newChatTests)
    return <StartComponent />
  }))
