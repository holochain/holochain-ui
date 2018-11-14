import * as React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { withNotes } from '@storybook/addon-notes'
import listChannels from './listChannels.md'
import CreateStore from '../../../../store'
import Channels from './channels'
import { specs } from 'storybook-addon-specifications'
import { channelsTests } from './channels.test'
import { channelData } from '../../data/channelData'

let store = CreateStore()

storiesOf('HoloChat/Channels', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('List my Channels', withNotes(listChannels)(() => {
    specs(() => channelsTests)
    return <Provider store={store}><Channels channels={channelData} /></Provider>
  }))
