import * as React from 'react';
import Channels, {State, Props} from './channels';
import * as Enzyme from 'enzyme';
import { mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import CreateStore from '../../../../store'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router'
import {channelData} from './channelData'

let store = CreateStore()
Enzyme.configure({ adapter: new Adapter() })

export const channelsTests = describe('Listing your channels', () => {

  let props: Props
  let mountedChannelsList: ReactWrapper<Props, State> | undefined

  const channelsList = () => {
    if (!mountedChannelsList) {
      mountedChannelsList = mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><Channels {...props}/></MemoryRouter></Provider>);
    }
    return mountedChannelsList;
  }

  beforeEach(() => {
    mountedChannelsList = undefined;
  })
  const mockFn = jest.fn();

  describe('When there is a list of existing channels', () => {
    beforeEach(() => {
      props = {
        getMyChannels: mockFn,
        newChannel: mockFn,
        setActiveChannel: mockFn,
        getUsers: mockFn,
        setIdentity: mockFn,
        personasList: mockFn,
        channels: channelData

      };
    })

    it('Channel view shows the list of existing channels', () => {
      const items = channelsList().find("ListItem")
      expect(items.length).toEqual(props.channels.length)
    })

  })
})
