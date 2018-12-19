import * as React from 'react'
import NewStream, { State, Props } from './newStream'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as Agents from '../../data/contactsBase64'
import { Member } from '../../types/model/stream'

Enzyme.configure({ adapter: new Adapter() })

// written following the guidlines of https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22

export const agentListTest = describe('agentList component', () => {
  let props: Props
  let mountedNewStream: Enzyme.ReactWrapper<Props, State> | undefined

  const newStream = () => {
    if (!mountedNewStream) {
      mountedNewStream = Enzyme.mount(
        <NewStream {...props}/>
      )
    }
    return mountedNewStream
  }

  beforeEach(() => {
    mountedNewStream = undefined
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
    newStream().find('input[id="filter-bar"]').simulate('change', { target: { value: 'a' } })
    newStream().find('ListItem').first().simulate('click')
    let selectedPeople: Array<Member> = (newStream().find('NewStream').instance().state as State).selectedUsers
    expect(selectedPeople.length).toEqual(1)
  })

  // I am assuming this is no longer relevent??
  // it('A new Public Stream shows the Stream Name', () => {
  //   expect(newStream().find('input[id="StreamName"]').length).toEqual(1)
  // })

  // it('A new Direct Message does not show the Stream Name', () => {
  //   props = {...props,
  //     isPublic: false
  //   }
  //   expect(newStream().find('input[id="StreamName"]').length).toEqual(0)
  // })

  it('Clicking Go submits the list of people to Create Stream', () => {
    newStream().find('input[id="filter-bar"]').simulate('change', { target: { value: 'art' } })
    newStream().find('ListItem').first().simulate('click')
    newStream().find('input[id="filter-bar"]').simulate('change', { target: { value: 'phil' } })
    newStream().find('ListItem').first().simulate('click')
    newStream().find('button[id="CreateStream"]').first().simulate('click')
    expect(props.onSubmit).toBeCalled()
  })

  it('Clicking Close sets open to false', () => {
    newStream().find('button[id="CloseDialog"]').first().simulate('click')
    let open: boolean = (newStream().find('NewStream').instance().state as State).open
    expect(open).toBeTruthy()
  })
})
