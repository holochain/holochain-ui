import React from 'react'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router'
import {storiesOf} from '@storybook/react'
import {action, decorateAction} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProfileForm from './profile'
import Profiles from './profiles'
import expect from 'expect'
import noPersonas from './noPersonas.md'
import threePersonas from './threePersonas.md'
import editProfile from './editProfile.md'
import  * as constants from '../../constants.js'

configure({adapter: new Adapter()})

import CreateStore from '../../../../store'

let store = CreateStore()

let clickPersona = {}
const personaCreate = decorateAction([
  args => {
    clickPersona = args[0]
    console.log(clickPersona)
    return args
  }
])

storiesOf('HoloVault/Profile', module)
  .add('List of Profiles', withNotes(noPersonas) (() => {
    return getProfiles([constants.profile1, constants.profile2, constants.profile3, constants.profile4, constants.profile5, constants.profile6])
  }))
  .add('New Profile no Existing Personas', withNotes(noPersonas) (() => {
    let noExistingPersonas = []
    specs(() => describe('New Profile no Existing Personas', function () {
      it('Creating a Profile with valid entries sends a Persona and a PersonaMapping', () => {
        const wrapper = mount(getProfile(constants.profile4.profileSpec, noExistingPersonas, constants.profile4.mapping))
        wrapper.find('input[name="timeZone"]').simulate('click')
        wrapper.find('input[name="timeZone"]').simulate('change', {target: {value: 'UTC+10'}})
        wrapper.find('input[name="avatar"]').simulate('change', {target: {value: 'base64'}})
        wrapper.find('button[name="createProfile"]').simulate('click')
      })
    }))
    return getProfile(constants.profile4.profileSpec, noExistingPersonas, constants.profile4.mapping)
  }))
  .add('New Profile with Existing Personas', withNotes(threePersonas) (() => {
    specs(() => describe('HoloVault/New Profile Existing Personas', function () {
      it('Creating a Profile by adding new entries sends a full Persona and a PersonaMapping', () => {
        const wrapper = mount(getProfile(constants.profile1.profileSpec, constants.personas, constants.profile1.mapping))
        wrapper.find('input[name="firstName"]').simulate('change', {target: {value: 'Phil'}})
        wrapper.find('input[name="lastName"]').simulate('change', {target: {value: 'Beadle'}})
        wrapper.find('input[name="handle"]').simulate('change', {target: {value: '@philt3r'}})
        wrapper.find('button[name="createProfile"]').simulate('click')
      })
    }))
    return getProfile(constants.profile1.profileSpec, constants.personas, constants.profile1.mapping)
  }))
  .add('Edit Profile', withNotes(editProfile) (() => {
    specs(() => describe('Edit Profile', function () {
      it('Creating a Profile by adding new entries sends a full Persona and a PersonaMapping', () => {
        const wrapper = mount(getProfile(constants.profile5.profileSpec, constants.personas, constants.profile5.mapping, constants.profile5.profileValues))
        wrapper.find('input[name="firstName"]').simulate('change', {target: {value: 'Phila'}})
        wrapper.find('input[name="lastName"]').simulate('change', {target: {value: 'Beadle'}})
        wrapper.find('input[name="handle"]').simulate('change', {target: {value: '@philt3r'}})
        wrapper.find('button[name="createProfile"]').simulate('click')
      })
    }))
    return getProfile(constants.profile5.profileSpec, constants.personas, constants.profile5.mapping, constants.profile5.profileValues)
  }))
function getProfiles(profiles) {
  return (<Provider store={store}><MemoryRouter initialEntries={['/']}><Profiles profiles={profiles} /></MemoryRouter></Provider>)
}

function getProfile(profileSpec, personas, mapping, profileValues) {
  if(mapping !== undefined){
    profileSpec.profile.forEach(function(profile){
      if(mapping.profile[profile.appLabel] !== undefined){
        profile.personaField = mapping.profile[profile.appLabel].replace('.', ' (') + ')'
        profile.value = profileValues[mapping.profile[profile.appLabel]]
      }
    })
  } else {
    profileSpec.profile.forEach(function(profile){
      profile.personaField = profileSpec.id + ' (' + profile.appLabel + ')'
      profile.value = ''
    })
    mapping = {
      "id": profileSpec.id,
      "sourceDna": profileSpec.sourceDna,
      "type": "object",
      "expiry": profileSpec.expiry,
      "profile": {}
    }
  }
  let history = []
  return (<Provider store={store}><MemoryRouter initialEntries={['/']}><ProfileForm profileMappingCreate={action('Sent the Profile Map')} personaCreate={personaCreate('Click Create Persona')} profileSpec={profileSpec} personas={personas} mapping={mapping} history={history} /></MemoryRouter></Provider>)
}
