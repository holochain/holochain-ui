import * as React from 'react'
import Channels, { State, Props } from './channels'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import CreateStore from '../../../../store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import * as constants from '../../constants'

let store = CreateStore()
Enzyme.configure({ adapter: new Adapter() })

export const channelsTests = describe('Listing your channels', () => {

  let props: Props
  let mountedChannelsList: Enzyme.ReactWrapper<Props, State> | undefined

  const channelsList = () => {
    if (!mountedChannelsList) {
      mountedChannelsList = Enzyme.mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><Channels {...props}/></MemoryRouter></Provider>)
    }
    return mountedChannelsList
  }

  beforeEach(() => {
    mountedChannelsList = undefined
  })
  const mockFn = jest.fn()
  props = {
    getMyChannels: mockFn,
    newChannel: jest.fn(() => Promise.reject('newChannel not implemented')),
    setActiveChannel: mockFn,
    setIdentity: mockFn,
    channels: constants.directMessageChannels,
    getSubjects: mockFn,
    title: 'Direct Messages',
    isPublic: false,
    subjects: []
  }

  it('When there is a list of existing channels the channel view shows the list of existing channels', () => {
    const items = channelsList().find('ExpansionPanel')
    expect(items.length).toEqual(props.channels.length)
  })

  // TODO: Figure out how to test the URL in history.push
  // it('Clicking a Channel in the list will set the URL to the channel and show the messages', () => {
  //   channelsList().find('ExpansionPanelSummary').get(0).props.onClick()
  //   expect(location.pathname).toEqual('/login')
  // })

  it('Clicking the Add Channel button shows the New Channel dialog and clicking the Close button closes it', (done) => {
    channelsList().find('button[id="AddChannel"]').simulate('click')
    process.nextTick(() => {
      channelsList().find('NewChannel').find('button[id="CloseDialog"]').simulate('click')
      expect(channelsList().find('NewChannel').props().open).toEqual(false)
      done()
    })
  })

  it('Clicking the Create Channel button will create a new channel', (done) => {
    channelsList().find('button[id="AddChannel"]').simulate('click')
    process.nextTick(() => {
      channelsList().find('NewChannel').find('button[id="CreateChannel"]').simulate('click')
      expect(channelsList().find('NewChannel').props().open).toEqual(false)
      expect(props.newChannel).toBeCalled()
      done()
    })
  })

  it('Unmouting the Channels List will stop it polling for the Channels list', () => {
    channelsList().unmount()
  })

})
