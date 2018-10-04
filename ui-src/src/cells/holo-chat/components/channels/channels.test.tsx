import * as React from 'react';
import Channels, {State, Props} from './channels';
import * as Enzyme from 'enzyme';
import { mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import CreateStore from '../../../../store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { channelData } from '../../data/channelData'

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


  props = {
    getMyChannels: mockFn,
    newChannel: mockFn,
    setActiveChannel: mockFn,
    getUsers: mockFn,
    setIdentity: mockFn,
    channels: channelData
  }

  it('When there is a list of existing channels the channel view shows the list of existing channels', () => {
    const items = channelsList().find("ListItem")
    expect(items.length).toEqual(props.channels.length)
  })

  it('Clicking a Channel in the list will set the active channel and show the messages', () => {
    channelsList().find("ListItem").get(0).props.onClick()
    expect(props.setActiveChannel).toBeCalled();
  })

  it('Clicking the Add Channel button sets the modalOpen state to true', () => {
    channelsList().find('button[id="AddChannel"]').simulate('click')
    expect(channelsList().find('NewChannel').props().open).toEqual(true)
  })

  it('Clicking the Close button sets the modalOpen state to false', (done) => {
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
      expect(props.newChannel).toBeCalled();
      done()
    })
  })

  it('Unmouting the Channels List will stop it polling for the Channels list', () => {
    channelsList().unmount()
  })

})
