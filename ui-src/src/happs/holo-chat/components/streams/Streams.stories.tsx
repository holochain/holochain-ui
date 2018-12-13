import * as React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { withNotes } from '@storybook/addon-notes'
import listStreams from './listStreams.md'
import CreateStore from '../../../../store'
import Streams from './streams'
import { specs } from 'storybook-addon-specifications'
import { streamsTests } from './streams.test'
import * as constants from '../../constants'

let store = CreateStore()

storiesOf('HoloChat/Streams', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('List my Streams Desktop', withNotes(listStreams)(() => {
    specs(() => streamsTests)
    return <Provider store={store}><Streams streams={constants.streams} title={'Public Streams'} isPublic={false} isMobile={false} subjects={constants.subjects} init={jest.fn(() => Promise.resolve('Init'))} /></Provider>
  }))
  .add('List my Streams Mobile', withNotes(listStreams)(() => {
    specs(() => streamsTests)
    return <Provider store={store}><Streams streams={constants.streams} title={'Public Streams'} isPublic={false} isMobile={true} subjects={constants.subjects} init={jest.fn(() => Promise.resolve('Init'))} /></Provider>
  }))
