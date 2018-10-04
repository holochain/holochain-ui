import React from 'react'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router'
import {storiesOf} from '@storybook/react'
import {action, decorateAction} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProfileField from './profileField'
import Profiles from './profiles'
import expect from 'expect'
import noPersonas from './noPersonas.md'
import threePersonas from './threePersonas.md'
import editProfile from './editProfile.md'
import  * as constants from '../../constants.js'

configure({adapter: new Adapter()})

import CreateStore from '../../../../store'

let store = CreateStore()
let suggestions = []
let clickPersona = {}
const onSelect = decorateAction([
  args => {
    let personaProfileMapping = args[0]
    console.log(personaProfileMapping)
    return args
  }
])

storiesOf('HoloVault/Profile Field', module)
  .add('Profile Field with Personas', withNotes(noPersonas) (() => {
    constants.personas.forEach(function(persona){
      persona.persona.personaFields.forEach(function(field){
        let key = Object.keys(field)[0]
        suggestions.push({ 'persona': persona.persona.name, 'field': key, 'label': field[key]})
      })
    })
    specs(() => describe('Profile Field with Personas', function () {
      it('Type in a value that is not part of a suggestion.', () => {
        const wrapper = mount(getProfileField(constants.profile4.profileSpec.profile[0].appLabel, constants.profile4.profileSpec.profile[0].display, constants.profile4.profileSpec.profile[0].usage, suggestions, 'Test', constants.profile4.profileSpec.id + '.' + constants.profile4.profileSpec.profile[0].appLabel))
        // wrapper.find('input[name="timeZone"]').instance().value
        wrapper.find('input[name="timeZone"]').simulate('change', {target: {value: 'UTC+10'}})
        })
    }))
    return getProfileField(constants.profile4.profileSpec.profile[0].appLabel, constants.profile4.profileSpec.profile[0].display, constants.profile4.profileSpec.profile[0].usage, suggestions, 'Test', constants.profile4.profileSpec.id + '.' + constants.profile4.profileSpec.profile[0].appLabel)
  }))


function getProfileField(specField, label, usage, suggestions, personaFieldValue, personaField) {
  // console.log(specField)
  // console.log(label)
  // console.log(usage)
  // console.log(suggestions)
  // console.log(personaFieldValue)
  // console.log(personaField)

  return (<ProfileField specField={specField} label={label} usage={usage} suggestions={suggestions} personaFieldValue={personaFieldValue} personaField={personaField} onSelect={onSelect('Value in the field has changed')}/>)
}
