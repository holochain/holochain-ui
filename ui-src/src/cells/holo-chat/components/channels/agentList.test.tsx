import * as React from 'react'
import AgentList, { AgentListState, AgentListProps } from './agentList'
import * as Enzyme from 'enzyme'
import { mount, ReactWrapper } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

// written following the guidlines of https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22

export const agentListTest = describe('agentList component', () => {
  let props: AgentListProps
  let mountedAgentList: ReactWrapper<AgentListProps, AgentListState> | undefined

  const agentList = () => {
    if (!mountedAgentList) {
      mountedAgentList = mount(
        <AgentList {...props}/>
      )
    }
    return mountedAgentList
  }

  beforeEach(() => {
    mountedAgentList = undefined
  })

  describe('When an empty list of users is passed', () => {
    beforeEach(() => {
      props = {
        users: []
      }
    })

    it('renders an input to filter users', () => {
      const inputs = agentList().find('Input')
      expect(inputs.length).toEqual(1)
    })
  })

  describe('When a list of user identities is passed', () => {
    beforeEach(() => {
      props = {
        users: [{ hash: '123', handle: 'AAA', avatar: '' }, { hash: '321', handle: 'BBB', avatar: '' }]
      }
    })

    it('renders a single listItem per user', () => {
      const items = agentList().find('ListItem')
      expect(items.length).toEqual(props.users.length)
    })

  })

})
