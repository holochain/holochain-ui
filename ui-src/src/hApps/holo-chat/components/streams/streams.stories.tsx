import * as React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { withNotes } from '@storybook/addon-notes'
import listStreams from './listStreams.md'
import CreateStore from '../../../../store'
import Streams, { Props } from './streams'
import { specs } from 'storybook-addon-specifications'
import { streamsTests } from './streams.test'
import * as constants from '../../constants'

let store = CreateStore()

let props: Props = {
  init: jest.fn(() => Promise.reject('init')),
  getAllMembers: jest.fn(() => Promise.reject('getAllMembers')),
  getMyStreams: jest.fn(() => Promise.reject('getMyStreams')),
  newStream: jest.fn(() => Promise.reject('newStream')),
  getSubjects: jest.fn(() => Promise.reject('getSubjects')),
  streams: constants.streams,
  title: 'Public Streams',
  isPublic: true,
  isMobile: false,
  subjects: constants.subjects,
  setStreamAddress: jest.fn(),
  setSubjectAddress: jest.fn()
}

storiesOf('HoloChat/Streams', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('List my Streams Desktop', withNotes(listStreams)(() => {
    specs(() => streamsTests)
    return <Provider store={store}><Streams {...props} /></Provider>
  }))
  .add('List my Streams Mobile', withNotes(listStreams)(() => {
    specs(() => streamsTests)
    return <Provider store={store}><Streams {...props} isMobile={true} /></Provider>
  }))
