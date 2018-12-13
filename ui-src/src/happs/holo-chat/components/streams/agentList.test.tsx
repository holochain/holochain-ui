import * as React from 'react'
import AgentList, { AgentListState, AgentListProps } from './agentList'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as Agents from '../../data/contactsBase64'

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
      members: []
    }
    const inputs = agentList().find('Input')
    expect(inputs.length).toEqual(1)
  })

  it('renders a single listItem per user', () => {
    props = {
      members: Agents.agents
    }
    const items = agentList().find('ListItem')
    expect(items.length).toEqual(props.members.length)
  })

  it('When you start typing someone\'s name the filtered list is shown', () => {
    props = {
      members: Agents.agents
    }
    agentList().find('input[id="filter-bar"]').simulate('change', { target: { value: 'art' } })
    const filteredItems = agentList().find('ListItem').length
    expect(filteredItems).toEqual(1)
  })

  it('Click someone\'s name and their chip is added to the list people in the Stream and the filter is cleared.', () => {
    props = {
      members: Agents.agents
    }
    agentList().find('input[id="filter-bar"]').simulate('change', { target: { value: 'a' } })
    agentList().find('ListItem').first().simulate('click')
    const selectedItems = agentList().find('Chip').length
    expect(selectedItems).toEqual(1)
  })

  it('Remove someone by clicking the cross near their name.', () => {
    props = {
      members: Agents.agents
    }
    // const unfilteredItems = agentList().find('ListItem').length
    agentList().find('input[id="filter-bar"]').simulate('change', { target: { value: 'a' } })
    agentList().find('ListItem').first().simulate('click')
    let selectedItems = agentList().find('Chip').length
    expect(selectedItems).toEqual(1)
    agentList().find('Cancel').first().simulate('click')
    selectedItems = agentList().find('Chip').length
    expect(selectedItems).toEqual(0)
  })
})
