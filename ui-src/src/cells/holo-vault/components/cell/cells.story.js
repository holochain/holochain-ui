import React from 'react'
import {Provider} from 'react-redux';
import { MemoryRouter } from 'react-router'
import {storiesOf} from '@storybook/react'
import {action, decorateAction} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cells from './cells'
import expect from 'expect'
import listCells from './listCells.md'
import  * as constants from '../../constants.js'
configure({adapter: new Adapter()})

import CreateStore from '../../../../store'

let store = CreateStore()


let clickPersona = {}
const personaCreate = decorateAction([
  args => {
    clickPersona = args[0]
    // console.log(clickPersona)
    return args
  }
])

storiesOf('HoloVault/Cells', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('List of Cells', withNotes(listCells) (() => {
        let cells = [constants.cell1, constants.cell2, constants.cell3, constants.cell4, constants.cell5, constants.cell6]
    // specs(() => describe('New Persona', function () {
    //   it('Creating a Persona by adding new fields and values, this will send a Persona to Holochain', () => {
    //     const wrapper = mount(getPersona(newPersona))
    //     const testPersona = {
    //       "name":"Personal",
    //       "personaFields":[
    //         {"firstName":"Phil"},
    //         {"lastName":"Beadle"}
    //       ]
    //     }
    //
    //     wrapper.find('input[name="personaName"]').simulate('change', {target: {value: 'Personal'}})
    //     wrapper.find('button[name="addField"]').simulate('click')
    //     wrapper.find('input[name="fieldName0"]').simulate('change', {target: {value: 'firstName'}})
    //     wrapper.find('input[name="fieldValue0"]').simulate('change', {target: {value: 'Phil'}})
    //     wrapper.find('button[name="addField"]').simulate('click')
    //     wrapper.find('input[name="fieldName1"]').simulate('change', {target: {value: 'lastName'}})
    //     wrapper.find('input[name="fieldValue1"]').simulate('change', {target: {value: 'Beadle'}})
    //     wrapper.find('button[name="createPersona"]').simulate('click')
    //     wrapper.update()
    //     expect(clickPersona).toEqual(testPersona)
    //   })
    // }))
    return getCells(cells)
  })
)

function getCells(cells) {
  return (<Provider store={store}><Cells cells={cells} /></Provider>)
}
