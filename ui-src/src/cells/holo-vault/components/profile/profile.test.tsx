import * as React from 'react'
import { mount, ReactWrapper, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as constants from '../../constants'
import Profile, { Props } from './profile'
// import CreateStore from '../../../../store'
// import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
// let store = CreateStore()
configure({ adapter: new Adapter() })

export const profileTests = describe('', () => {

  let props: Props
  let mountedProfile: ReactWrapper<Props, {}> | undefined

  const profileField = () => {
    if (!mountedProfile) {
      mountedProfile = mount(<MemoryRouter initialEntries={['/']}><Profile {...props}/></MemoryRouter>)
    }
    return mountedProfile
  }

  beforeEach(() => {
    mountedProfile = undefined
  })

  // const mockFn = jest.fn()

  it('A new Profile has an empty AutoCompleteProfileField for each field in the Profile request', () => {
    props = {
      personas: constants.personas,
      profile: constants.exampleProfileNotMapped
    }
    expect(profileField().find('AutoCompleteProfileField').length).toEqual(constants.exampleProfile.fields.length)
    profileField().find('input[name="name"]').map(function (field) {
      expect(field.props().value).toEqual('')
    })
  })

  it('When an invalid mapping is used, the Profile has an empty AutoCompleteProfileField for each field in the Profile request', () => {
    props = {
      personas: constants.personas,
      profile: constants.exampleFaultyProfile
    }
    expect(profileField().find('AutoCompleteProfileField').length).toEqual(constants.exampleProfile.fields.length)
    profileField().find('input[name="name"]').map(function (field) {
      expect(field.props().value).toEqual('')
    })
  })

  it('When an valid mapping is used, the Profile form has a populated AutoCompleteProfileField for each field in the Profile request', () => {
    props = {
      personas: constants.personas,
      profile: constants.exampleProfileMappedCorrectly
    }
    expect(profileField().find('AutoCompleteProfileField').length).toEqual(constants.exampleProfile.fields.length)
    profileField().find('input[name="name"]').map(function (field) {
      expect(field.props().value).not.toEqual(undefined)
      expect(field.props().value).not.toEqual('')
    })
  })
})
