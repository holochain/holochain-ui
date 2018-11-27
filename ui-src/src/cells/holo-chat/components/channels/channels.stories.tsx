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
import * as constants from '../../constants'

let store = CreateStore()

storiesOf('HoloChat/Channels', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('List my Channels', withNotes(listChannels)(() => {
    specs(() => channelsTests)
    return <Provider store={store}><Channels channels={constants.publicChannels} title={'Public Channels'} isPublic={false} subjects={constants.subjects} /></Provider>
  }))
