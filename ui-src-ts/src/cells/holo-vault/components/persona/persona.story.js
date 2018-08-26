import React from 'react'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router'
import {storiesOf} from '@storybook/react'
import {action, decorateAction} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PersonaForm from './persona'
import expect from 'expect'
import newPersonaNotes from './newPersona.md'
import editPersonaNotes from './threePersonas.md'
configure({adapter: new Adapter()})

import CreateStore from '../../../../store'

let store = CreateStore()
let newPersona = {
    "name": "",
    "personaFields": [
    ]
}
let newHash = ""
let newButtonText = "Create Persona"
let persona =
{
    "name": "Personal",
    "personaFields": [
        {"firstName": "Phil"},
        {"lastName": "Beadle"},
        {"address": "123 Holochain Road"},
        {"suburb": "Burwood"},
        {"city": "Melbourne"}
    ]
}
let hash = "rtyeyyutyr"
let buttonText = "Update Persona"
let createPersona = {}
const personaCreate = decorateAction([
  args => {
    createPersona = args[0]
    console.log(createPersona)
    return args
  }
])

let updatePersona = {}
const personaUpdate = decorateAction([
  args => {
    updatePersona = args[0]
    // console.log(clickPersona)
    return args
  }
])

storiesOf('HoloVault/Persona', module)
  .add('New Persona', withNotes(newPersonaNotes) (() => {
    specs(() => describe('New Persona', function () {
      it('Creating a Persona by adding new fields and values, this will send a Persona to Holochain', () => {
        const wrapper = mount(getPersona(newPersona, newHash, newButtonText))
        const testPersona = {
          "name":"Personal",
          "personaFields":[
            {"firstName":"Phil"},
            {"lastName":"Beadle"}
          ]
        }

        wrapper.find('input[name="personaName"]').simulate('change', {target: {value: 'Personal'}})
        wrapper.find('button[name="addField"]').simulate('click')
        wrapper.find('input[name="fieldName0"]').simulate('change', {target: {value: 'firstName'}})
        wrapper.find('input[name="fieldValue0"]').simulate('change', {target: {value: 'Phil'}})
        wrapper.find('button[name="addField"]').simulate('click')
        wrapper.find('input[name="fieldName1"]').simulate('change', {target: {value: 'lastName'}})
        wrapper.find('input[name="fieldValue1"]').simulate('change', {target: {value: 'Beadle'}})
        wrapper.find('button[name="createPersona"]').simulate('click')
        expect(createPersona).toEqual(testPersona)
      })
    }))
    return getPersona(newPersona, newHash, newButtonText)
  }))
  .add('Edit Existing Persona', withNotes(editPersonaNotes) (() => {
    return getPersona(persona, hash, buttonText)
  })
)

function getPersona(persona, hash, buttonText) {
  let history = []
  return (<Provider store={store}><MemoryRouter initialEntries={['/']}><PersonaForm personaCreate={personaCreate('Click Create Persona')} personaUpdate={personaUpdate('Click Update Persona')} personasList={action('Refresh Persona List')} history={history} persona={persona} hash={hash} buttonText ={buttonText} /></MemoryRouter></Provider>)
}
