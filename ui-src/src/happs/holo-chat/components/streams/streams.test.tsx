import * as React from 'react'
import Streams, { State, Props } from './streams'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import CreateStore from '../../../../store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import * as constants from '../../constants'

let store = CreateStore()
Enzyme.configure({ adapter: new Adapter() })

export const streamsTests = describe('Listing your streams', () => {

  let props: Props
  let mountedStreamsList: Enzyme.ReactWrapper<Props, State> | undefined

  const streamsList = () => {
    if (!mountedStreamsList) {
      mountedStreamsList = Enzyme.mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><Streams {...props}/></MemoryRouter></Provider>)
    }
    return mountedStreamsList
  }

  beforeEach(() => {
    mountedStreamsList = undefined
  })

  props = {
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

  it('When there is a list of existing streams the stream view shows the list of existing streams', () => {
    const items = streamsList().find('ExpansionPanel')
    expect(items.length).toEqual(3)
  })

  // // TODO: Figure out how to test the URL in history.push
  // it('Clicking a Stream in the list will set the URL to the stream', () => {
  //   streamsList().find('ExpansionPanelSummary').get(0).props.onClick()
  //   expect(location.pathname).toEqual('/stream/QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps')
  // })

  // it('Clicking a Subject will set the URL to the stream and subject', (done) => {
  //   streamsList().find('ExpansionPanelSummary').get(0).props.onClick()
  //   process.nextTick(() => {
  //     streamsList().find('Chip').get(0).props.onClick()
  //     expect(location.pathname).toEqual('/stream/QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps')
  //     done()
  //   })
  // })

  it('Clicking the Add Stream button shows the New Stream dialog and clicking the Close button closes it', (done) => {
    streamsList().find('button[id="AddStream"]').simulate('click')
    process.nextTick(() => {
      streamsList().find('NewStream').find('button[id="CloseDialog"]').simulate('click')
      expect(streamsList().find('NewStream').props().open).toEqual(false)
      done()
    })
  })

  it('Clicking the Create Stream button will create a new Stream', (done) => {
    streamsList().find('button[id="AddStream"]').simulate('click')
    process.nextTick(() => {
      streamsList().find('NewStream').find('button[id="CreateStream"]').simulate('click')
      expect(streamsList().find('NewStream').props().open).toEqual(false)
      expect(props.newStream).toBeCalled()
      done()
    })
  })

  it('Unmouting the Streams List will stop it polling for the Streams list', () => {
    streamsList().unmount()
  })

})
