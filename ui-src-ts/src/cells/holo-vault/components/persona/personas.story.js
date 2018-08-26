import React from 'react'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router'
import {storiesOf} from '@storybook/react'
import {action, decorateAction} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Personas from './personas'
import expect from 'expect'
import listPersonasNotes from './listPersonas.md'
import  * as constants from '../../constants.js'

configure({adapter: new Adapter()})

import CreateStore from '../../../../store'

let store = CreateStore()

storiesOf('HoloVault/Persona', module)
  .add('List Personas', withNotes(listPersonasNotes) (() => {
    return getPersonas(constants.personas)
  }))

function getPersonas(personas) {
  return (<Provider store={store}><MemoryRouter initialEntries={['/']}><Personas personas={personas} personasList={()=> {}} /></MemoryRouter></Provider>)
}
