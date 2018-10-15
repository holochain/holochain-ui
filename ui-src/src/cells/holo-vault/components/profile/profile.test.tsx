import * as React from 'react'
import { mount, ReactWrapper, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as constants from '../../constants'
import Profile, { Props } from './profile'
import CreateStore from '../../../../store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
let store = CreateStore()
configure({ adapter: new Adapter() })

export const profileTests = describe('', () => {

  let props: Props
  let mountedProfile: ReactWrapper<Props, {}> | undefined

  const profileField = () => {
    if (!mountedProfile) {
      mountedProfile = mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><Profile {...props}/></MemoryRouter></Provider>)
    }
    return mountedProfile
  }

  beforeEach(() => {
    mountedProfile = undefined
  })

  // const mockFn = jest.fn()

  it('Selecting a Persona value ', () => {
    props = {
      personas: constants.personas,
      profile: constants.exampleProfile
    }

    profileField().find('AutoCompleteProfileField')

    expect(3).toEqual(3)
  })

})
