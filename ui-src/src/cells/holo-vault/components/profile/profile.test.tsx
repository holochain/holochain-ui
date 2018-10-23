import * as React from 'react'
import { mount, ReactWrapper, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as constants from '../../constants'
import Profile, { Props, State } from './profile'
import { Profile as ProfileType } from '../../types/profile'
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
  const mockPromise = jest.fn(() => Promise.reject(''))

  it('A new Profile has an empty AutoCompleteProfileField for each field in the Profile request', () => {
    props = {
      personas: constants.personas,
      profile: constants.exampleProfileNotMappedNoDefaults,
      profiles: [],
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise
    }
    expect(profileField().find('AutoCompleteProfileField').length).toEqual(constants.exampleProfileNotMappedNoDefaults.fields.length)
    profileField().find('input[name="name"]').map(function (field) {
      expect(field.props().value).toEqual('')
    })
  })

  it('When an invalid mapping is used, the Profile has an empty AutoCompleteProfileField for each field in the Profile request', () => {
    props = {
      personas: constants.personas,
      profile: constants.exampleFaultyProfile,
      profiles: [],
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise
    }
    expect(profileField().find('AutoCompleteProfileField').length).toEqual(constants.exampleProfile.fields.length)
    let fields = profileField().find('input[name="name"]')
    expect(fields.first().props().value).toEqual('')
    expect(fields.at(1).props().value).toEqual('')
    expect(fields.last().props().value).toEqual('Beadle') // not mapped sop gets default
  })

  it('When an valid mapping is used, the Profile form has a populated AutoCompleteProfileField for each field in the Profile request', () => {
    props = {
      personas: constants.personas,
      profile: constants.exampleProfileMappedCorrectly,
      profiles: [],
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise
    }
    expect(profileField().find('AutoCompleteProfileField').length).toEqual(constants.exampleProfile.fields.length)
    profileField().find('input[name="name"]').map(function (field) {
      expect(field.props().value).not.toEqual(undefined)
      expect(field.props().value).not.toEqual('')
    })
  })

  it('Mapping or entering new info into a field updates the Profile state', () => {
    props = {
      personas: constants.personas,
      profile: constants.exampleProfileNotMapped,
      profiles: [],
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise
    }
    let profile: ProfileType = (profileField().find('Profile').instance().state as State).profile
    expect(profile.fields[0].mapping).toEqual(undefined)
    profileField().find('input[name="name"]').first().simulate('change', { target: { value: 'P' } })
    profileField().find('input[name="name"]').first().simulate('focus')
    profileField().find('MenuItem').first().simulate('click')
    profileField().find('input[name="name"]').first().simulate('blur')
    profile = (profileField().find('Profile').instance().state as State).profile
    expect(profile.fields[0].mapping).not.toEqual(undefined)
  })

  it('Clicking Save Profile fires the event', () => {
    props = {
      personas: constants.personas,
      profile: constants.exampleProfileMappedCorrectly,
      profiles: [],
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise
    }

    profileField().find('Button').simulate('click')
    expect(props.save).toBeCalled()
  })
})
