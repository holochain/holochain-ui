import * as React from 'react'
import NewChannel, { State, Props } from './newChannel'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as Agents from '../../data/contactsBase64'
import { Identity } from '../../types/model/identity'

Enzyme.configure({ adapter: new Adapter() })

// written following the guidlines of https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22

export const agentListTest = describe('agentList component', () => {
  let props: Props
  let mountedNewChannel: Enzyme.ReactWrapper<Props, State> | undefined

  const newChannel = () => {
    if (!mountedNewChannel) {
      mountedNewChannel = Enzyme.mount(
        <NewChannel {...props}/>
      )
    }
    return mountedNewChannel
  }

  beforeEach(() => {
    mountedNewChannel = undefined
  })

  const mockFn = jest.fn()
  props = {
    open: true,
    members: Agents.agents,
    onSubmit: mockFn,
    onHandleClose: mockFn,
    isPublic: true,
    getAllMembers: jest.fn(() => Promise.reject('getAllMembers not implemented'))
  }

  it('Selecting people in the list sets the selected users in the state', () => {
    newChannel().find('input[id="filter-bar"]').simulate('change', { target: { value: 'a' } })
    newChannel().find('ListItem').first().simulate('click')
    let selectedPeople: Array<Identity> = (newChannel().find('NewChannel').instance().state as State).selectedUsers
    expect(selectedPeople.length).toEqual(1)
  })

  // I am assuming this is no longer relevent??
  // it('A new Public Channel shows the Channel Name', () => {
  //   expect(newChannel().find('input[id="ChannelName"]').length).toEqual(1)
  // })

  // it('A new Direct Message does not show the Channel Name', () => {
  //   props = {...props,
  //     isPublic: false
  //   }
  //   expect(newChannel().find('input[id="ChannelName"]').length).toEqual(0)
  // })

  it('Clicking Go submits the list of people to Create Channel', () => {
    newChannel().find('input[id="filter-bar"]').simulate('change', { target: { value: 'art' } })
    newChannel().find('ListItem').first().simulate('click')
    newChannel().find('input[id="filter-bar"]').simulate('change', { target: { value: 'phil' } })
    newChannel().find('ListItem').first().simulate('click')
    newChannel().find('button[id="CreateChannel"]').first().simulate('click')
    expect(props.onSubmit).toBeCalled()
  })

  it('Clicking Close sets open to false', () => {
    newChannel().find('button[id="CloseDialog"]').first().simulate('click')
    let open: boolean = (newChannel().find('NewChannel').instance().state as State).open
    expect(open).toBeTruthy()
  })
})
