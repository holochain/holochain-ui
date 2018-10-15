import * as React from 'react'
import AutoCompleteProfileField, { State, Props } from './autoCompleteProfileField'
import { mount, ReactWrapper, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as constants from '../../constants'
import { Suggestion as SuggestionType } from '../../types/suggestion'

configure({ adapter: new Adapter() })

export const autoCompleteProfileFieldTests = describe('Auto selecting Persona values to create a Profile Mapping', () => {

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

  it('Display the Profile Field for an unmapped field that stores your data in the hApp DHT', () => {

    props = {
      personas: constants.personas,
      profile: constants.exampleProfile,
      field: constants.exampleProfile.fields[1],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('TextField').props().label).toEqual('First Name')
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Holo-Chat - first_name')
  })

  it('Display the Profile Field for an unmapped field that displays your data from your Vault', () => {

    props = {
      personas: constants.personas,
      profile: constants.exampleProfile,
      field: constants.exampleProfile.fields[2],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('TextField').props().label).toEqual('Last Name')
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Holo-Chat - last_name')
  })

  it('Display the Profile Field for a mapped field that stores your data in the hApp DHT', () => {

    props = {
      personas: constants.personas,
      profile: constants.exampleProfile,
      field: constants.exampleProfile.fields[0],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('TextField').props().label).toEqual('Handle')
    expect(autoCompleteProfileField().find('input[name="name"]').props().value).toEqual('@philt3r')
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Friends - nickName')
  })

  it('Does not try to map the field if the Persona cannot be found', () => {

    props = {
      personas: constants.personas,
      profile: constants.exampleFaultyProfile,
      field: constants.exampleFaultyProfile.fields[0],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('TextField').props().label).toEqual('Handle')
    expect(autoCompleteProfileField().find('input[name="name"]').props().value).toEqual('')
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Holo-Chat - handle')
  })

  it('Does not try to map the field if the Persona field cannot be found', () => {

    props = {
      personas: constants.personas,
      profile: constants.exampleFaultyProfile,
      field: constants.exampleFaultyProfile.fields[1],
      handleMappingChange: mockFn
    }
    expect(autoCompleteProfileField().find('TextField').props().label).toEqual('First Name')
    expect(autoCompleteProfileField().find('input[name="name"]').props().value).toEqual('')
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Holo-Chat - first_name')
  })

  it('Selecting a Persona value for an unmapped field sets the mapping', () => {

    props = {
      personas: constants.personas,
      profile: constants.exampleProfile,
      field: constants.exampleProfile.fields[1],
      handleMappingChange: mockFn
    }
    autoCompleteProfileField().find('input[name="name"]').simulate('change', { target: { value: 'P' } })
    autoCompleteProfileField().find('input[name="name"]').simulate('focus')
    autoCompleteProfileField().find('MenuItem').first().simulate('click')
    autoCompleteProfileField().find('input[name="name"]').simulate('blur')
    expect(props.handleMappingChange).toBeCalled()
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Personal - firstName')
  })

  it('Deleting all the text in the field shows no suggestions and sets the mapping back to default', () => {

    props = {
      personas: constants.personas,
      profile: constants.exampleProfile,
      field: constants.exampleProfile.fields[2],
      handleMappingChange: mockFn
    }
    // autoCompleteProfileField().find('input[name="name"]').simulate('change', { target: { value: 'P' } })
    // autoCompleteProfileField().find('input[name="name"]').simulate('change', { target: { value: '' } })
    // autoCompleteProfileField().find('input[name="name"]').simulate('focus')
    let suggestions: Array<SuggestionType> = (autoCompleteProfileField().find('AutoCompleteProfileField').instance().state as State).suggestions
    expect(suggestions.length).toEqual(0)
    expect(autoCompleteProfileField().find('Typography').text()).toEqual('Holo-Chat - last_name')
  })
})
