import * as React from 'react'
import AutoCompleteProfileField, { State, Props } from './autoCompleteProfileField'
import { mount, ReactWrapper, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as constants from '../../constants'
import { Suggestion as SuggestionType } from '../../types/suggestion'

configure({ adapter: new Adapter() })

export const autoCompleteProfileFieldTests = describe('Selecting Persona values to create a Profile Mapping', () => {

  let props: Props
  let mountedAutoCompleteProfileField: ReactWrapper<Props, State> | undefined

  const autoCompleteProfileField = () => {
    if (!mountedAutoCompleteProfileField) {
      mountedAutoCompleteProfileField = mount(<AutoCompleteProfileField {...props}/>)
    }
    return mountedAutoCompleteProfileField
  }

  beforeEach(() => {
    mountedAutoCompleteProfileField = undefined
  })

  const mockFn = jest.fn()

  it('Display the Profile Field for an unmapped field with no default that stores your data in the hApp DHT', () => {

    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileNotMappedNoDefaults,
      field: constants.exampleProfileNotMappedNoDefaults.fields[0],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('TextField').props().label).toEqual('Genre')
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Default - genre')
  })

  it('Display the Profile Field for an unmapped field with no default that displays your data from your Vault', () => {

    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileNotMappedNoDefaults,
      field: constants.exampleProfileNotMappedNoDefaults.fields[1],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('TextField').props().label).toEqual('No Default Value')
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Default - no_default')
  })

  it('Display the Profile Field for a mapped field that stores your data in the hApp DHT', () => {

    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfile,
      field: constants.exampleProfile.fields[0],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('TextField').props().label).toEqual('Handle')
    expect(autoCompleteProfileField().find('input[name="name"]').props().value).toEqual('@philt3r')
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Friends - nick_name')
  })

  it('Does not try to map the field if the Persona cannot be found', () => {

    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleFaultyProfile,
      field: constants.exampleFaultyProfile.fields[0],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('TextField').props().label).toEqual('Handle')
    expect(autoCompleteProfileField().find('input[name="name"]').props().value).toEqual('')
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Default - handle')
  })

  it('Does not try to map the field if the Persona field cannot be found', () => {

    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleFaultyProfile,
      field: constants.exampleFaultyProfile.fields[1],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('TextField').props().label).toEqual('First Name')
    expect(autoCompleteProfileField().find('input[name="name"]').props().value).toEqual('')
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Default - first_name')
  })

  it('Selecting a Persona value for an unmapped field sets the mapping', () => {

    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfile,
      field: constants.exampleProfile.fields[1],
      handleMappingChange: mockFn
    }
    autoCompleteProfileField().find('input[name="name"]').simulate('change', { target: { value: 'P' } })
    autoCompleteProfileField().find('input[name="name"]').simulate('focus')
    autoCompleteProfileField().find('MenuItem').first().simulate('click')
    autoCompleteProfileField().find('input[name="name"]').simulate('blur')
    expect(props.handleMappingChange).toBeCalled()
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Default - first_name')
  })

  it('Deleting all the text in the field shows no suggestions and sets the mapping back to default', () => {

    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[1],
      profile: constants.exampleProfileNotMappedNoDefaults,
      field: constants.exampleProfileNotMappedNoDefaults.fields[1],
      handleMappingChange: mockFn
    }
    autoCompleteProfileField().find('input[name="name"]').simulate('change', { target: { value: 'P' } })
    autoCompleteProfileField().find('input[name="name"]').simulate('focus')
    autoCompleteProfileField().find('input[name="name"]').simulate('change', { target: { value: '' } })
    autoCompleteProfileField().find('input[name="name"]').simulate('focus')
    let suggestions: Array<SuggestionType> = (autoCompleteProfileField().find('AutoCompleteProfileField').instance().state as State).suggestions
    expect(suggestions.length).toEqual(0)
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Personal - no_default')
  })

  it('Populates data field, persona field and field name field if a match is found in any persona', () => {
    props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileNotMapped,
      field: constants.exampleProfileNotMapped.fields[1],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('input[name="name"]').props().value).toEqual('Phil')
  })

})
