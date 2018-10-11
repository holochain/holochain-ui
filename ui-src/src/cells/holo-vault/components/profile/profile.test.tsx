import * as React from 'react'
import { mount, ReactWrapper, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import Profile, { Props } from './profile'

configure({ adapter: new Adapter() })

export const profileTests = describe('', () => {

  let props: Props
  let mountedProfile: ReactWrapper<Props, {}> | undefined

  const profileField = () => {
    if (!mountedProfile) {
      mountedProfile = mount(<Profile {...props}/>)
    }
    return mountedProfile
  }

  beforeEach(() => {
    mountedProfile = undefined
  })

  // const mockFn = jest.fn()

  it('Selecting a Persona value ', () => {
    profileField().find('').equals(null)
    props = {}

  })

})
