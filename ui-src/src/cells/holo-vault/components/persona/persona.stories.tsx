import * as React from 'react'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {specs} from 'storybook-addon-specifications'
import { withNotes } from '@storybook/addon-notes'
import PersonaForm from './persona'
import newPersonaNotes from './newPersona.md'
import editPersonaNotes from './threePersonas.md'
import { personaTests } from './persona.test'
import CreateStore from '../../../../store'
import { Persona as PersonaType } from '../../types/persona'

let store = CreateStore()

let newPersona = {
    "name": "dddd",
    "hash": "",
    "fields": [
    ]
}
let newButtonText = "Create Persona"
let editPersona =
{
  "hash": "QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7",
  "name": "Personal",
  "fields": [
      {"name": "firstName", "data": "Phil"},
      {"name": "lastName", "data": "Beadle"},
      {"name": "address", "data": "123 Holochain Road"},
      {"name": "suburb", "data": "Burwood"},
      {"name": "city", "data": "Melbourne"}
  ]
}
let updateButtonText = "Update Persona"

storiesOf('HoloVault/Persona', module)
  .add('New Persona', withNotes(newPersonaNotes) (() => {
    specs(() => personaTests)
    return getPersona(newPersona, newButtonText)
  }))
  .add('Edit Existing Persona', withNotes(editPersonaNotes) (() => {
    return getPersona(editPersona, updateButtonText)
  })
)

function getPersona(persona: PersonaType, buttonText:string) {
  return (<Provider store={store}><MemoryRouter initialEntries={['/']}><PersonaForm personaCreate={action('Click Create Persona')} personaUpdate={action('Click Update Persona')} personasList={action('Refresh Persona List')} currentPersona={persona} buttonText ={buttonText} /></MemoryRouter></Provider>)
}
