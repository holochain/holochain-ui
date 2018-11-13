import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { specs } from 'storybook-addon-specifications'
import { withNotes } from '@storybook/addon-notes'
import Persona from './persona'
import newPersonaNotes from './newPersona.md'
import editPersonaNotes from './threePersonas.md'
import { personaTests } from './persona.test'
import CreateStore from '../../../../store'
import { Persona as PersonaType } from '../../types/persona'

let store = CreateStore()

let newPersona: PersonaType = {
  'name': '',
  'hash': '',
  'fields': []
}

let editPersona: PersonaType = {
  'hash': 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7',
  'name': 'Personal',
  'fields': [
    { 'name': 'firstName', 'data': 'Phil' },
    { 'name': 'lastName', 'data': 'Beadle' },
    { 'name': 'address', 'data': '123 Holochain Road' },
    { 'name': 'suburb', 'data': 'Burwood' },
    { 'name': 'city', 'data': 'Melbourne' }
  ]
}

storiesOf('HoloVault/Persona', module)
  .add('New Persona', withNotes(newPersonaNotes)(() => {
    specs(() => personaTests)
    return getPersona(newPersona)
  }))
  .add('Edit Existing Persona', withNotes(editPersonaNotes)(() => {
    return getPersona(editPersona)
  })
)

function getPersona (persona: PersonaType) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Persona create={action('Click Create Persona')} update={action('Click Update Persona')} getPersonas={jest.fn(() => Promise.resolve('Get Personas'))} currentPersona={persona}/>
      </MemoryRouter>
    </Provider>)
}
