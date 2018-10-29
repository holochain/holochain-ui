import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { storiesOf } from '@storybook/react'
import { withNotes } from '@storybook/addon-notes'
import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import Personas from './personas'
import listPersonasNotes from './listPersonas.md'
import * as constants from '../../constants'
import { Persona } from '../../types/persona'

configure({ adapter: new Adapter() })

import CreateStore from '../../../../store'

let store = CreateStore()

storiesOf('HoloVault/Persona', module)
  .add('List Personas', withNotes(listPersonasNotes)(() => {
    return getPersonas(constants.personas)
  }))

function getPersonas (personas: Array<Persona>) {
  // tslint:disable jsx-no-lambda
  return (<Provider store={store}><MemoryRouter initialEntries={['/']}><Personas personas={personas} getPersonas={jest.fn(() => Promise.resolve('Get Personas'))} /></MemoryRouter></Provider>)
}
