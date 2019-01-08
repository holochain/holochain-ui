import * as React from 'react'
import { mount, ReactWrapper, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as constants from '../../constants'
import Profile, { ProfileBase, Props, State } from './profile'
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

  const mockFn = jest.fn()
  const mockPromise = jest.fn(() => Promise.reject('Profile test mockPromise'))

  it('A new Profile has an empty AutoCompleteProfileField for each field in the Profile request', () => {
    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileNotMappedNoDefaults,
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise,
      setCurrentPersona: mockFn
    }
    expect(profileField().find('AutoCompleteProfileField').length).toEqual(constants.exampleProfileNotMappedNoDefaults.fields.length)
    profileField().find('input[name="name"]').map(function (field) {
      expect(field.props().value).toEqual('')
    })
  })

  it('When an invalid mapping is used, the Profile has an empty AutoCompleteProfileField for each field in the Profile request', () => {
    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleFaultyProfile,
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise,
      setCurrentPersona: mockFn
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
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileMappedCorrectly,
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise,
      setCurrentPersona: mockFn
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
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileNotMappedNoDefaults,
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise,
      setCurrentPersona: mockFn
    }
    let profile: ProfileType = (profileField().find('Profile').instance().state as State).profile
    expect(profile.fields[0].mapping).toEqual(undefined)
    profileField().find('input[name="name"]').first().simulate('change', { target: { value: '@' } })
    profileField().find('input[name="name"]').first().simulate('focus')
    profileField().find('MenuItem').first().simulate('click')
    profileField().find('input[name="name"]').first().simulate('blur')
    profile = (profileField().find('Profile').instance().state as State).profile
    expect(profile.fields[0].mapping).not.toEqual(undefined)
  })

  it('Clicking Save Profile fires the event', () => {
    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileMappedCorrectly,
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise,
      setCurrentPersona: mockFn
    }

    profileField().find('Button').simulate('click')
    expect(props.save).toBeCalled()
  })

  it('Entering a value into an unmapped field adds the field to the selected Persona', () => {
    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileNotMappedNoDefaults,
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise,
      setCurrentPersona: mockFn
    }
    profileField().find('input[name="name"]').first().simulate('change', { target: { value: 'Techno' } })
    profileField().find('input[name="name"]').first().simulate('focus')
    profileField().find('input[name="name"]').first().simulate('blur')
  })

  it('Check getDerivedStateFromProps returns null when props dont set a profile', () => {
    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileNotMappedNoDefaults,
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise,
      setCurrentPersona: mockFn
    }
    const prevState = {
      profile: {}
    }
    // @ts-ignore
    let newState = ProfileBase.getDerivedStateFromProps(props, prevState)
    expect(newState).toEqual(null)
  })
  it('Check getDerivedStateFromProps returns correct state update when props set a profile', () => {
    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileNotMappedNoDefaults,
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise,
      setCurrentPersona: mockFn
    }
    const prevState = {
      profile: {}
    }
    // @ts-ignore
    let newState = ProfileBase.getDerivedStateFromProps(props, prevState)
    expect(newState).toEqual(null)
  })
})
