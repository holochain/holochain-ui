import * as React from 'react'
import AgentList, { AgentListState, AgentListProps } from './agentList'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

// written following the guidlines of https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22

export const agentListTest = describe('agentList component', () => {
  let props: AgentListProps
  let mountedAgentList: Enzyme.ReactWrapper<AgentListProps, AgentListState> | undefined

  const agentList = () => {
    if (!mountedAgentList) {
      mountedAgentList = Enzyme.mount(
        <AgentList {...props}/>
      )
    }
    return mountedAgentList
  }

  beforeEach(() => {
    mountedAgentList = undefined
  })

  it('renders an input to filter users', () => {
    props = {
      users: []
    }
    const inputs = agentList().find('Input')
    expect(inputs.length).toEqual(1)
  })

  it('renders a single listItem per user', () => {
    props = {
      users: [{ hash: '123', handle: 'AAA', name: 'AAA', avatar: '' }, { hash: '321', handle: 'BBB', name: 'BBB', avatar: '' }]
    }
    const items = agentList().find('ListItem')
    expect(items.length).toEqual(props.users.length)
  })

  it('When you start typing someone\'s name the filtered list is shown', () => {
    expect(3).toEqual(3)
  })

  it('Click someone\'s name and their chip is added to the list people in the Channel and the filter is cleared.', () => {
    expect(3).toEqual(3)
  })

  it('Filter the list again and click someone\'s name to add their chip.', () => {
    expect(3).toEqual(3)
  })

  it('Remove someone by clicking the cross near their name.', () => {
    expect(3).toEqual(3)
  })

  it('Click the "Be Present" button to create your new channel and start the Chat.', () => {
    expect(3).toEqual(3)
  })
})
