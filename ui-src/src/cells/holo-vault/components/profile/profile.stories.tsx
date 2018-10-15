import * as React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
// import { specs } from 'storybook-addon-specifications'
import { withNotes } from '@storybook/addon-notes'
import Profile from './profile'
import autoCompleteProfileFieldNotes from './autoCompleteProfileFieldNotes.md'
// import { autoCompleteProfileFieldTests } from './autoCompleteProfileField.test'
import * as constants from '../../constants'
import CreateStore from '../../../../store'

let store = CreateStore()

storiesOf('HoloVault/Profile', module)
  .add('Profile form not mapped', withNotes(autoCompleteProfileFieldNotes)(() => {
    // specs(() => autoCompleteProfileFieldTests)
    let personas = constants.personas
    let profile = constants.exampleProfile
    let field = constants.exampleProfile.fields[1]

    return <Provider store={store}><MemoryRouter initialEntries={['/']}><Profile personas={personas} profile={profile} field={field} /></MemoryRouter></Provider>
  }))
