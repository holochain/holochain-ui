import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { specs } from 'storybook-addon-specifications'
import { withNotes } from '@storybook/addon-notes'
import AutoCompleteProfileField from './autoCompleteProfileField'
import autoCompleteProfileFieldNotes from './autoCompleteProfileFieldNotes.md'
import { autoCompleteProfileFieldTests } from './autoCompleteProfileField.test'
import * as constants from '../../constants'

storiesOf('HoloVault/Profile/AutoComplete', module)
  .add('Autocomplete Profile Field not mapped', withNotes(autoCompleteProfileFieldNotes)(() => {
    // specs(() => autoCompleteProfileFieldTests)
    const props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileNotMappedNoDefaults,
      field: constants.exampleProfileNotMappedNoDefaults.fields[0],
      handleMappingChange: action('Select a Persona Field')
    }
    return <AutoCompleteProfileField {...props} />
  }))
  .add('Autocomplete Profile Field not mapped but has matching persona value', withNotes(autoCompleteProfileFieldNotes)(() => {
    // specs(() => autoCompleteProfileFieldTests)
    const props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfileNotMapped,
      field: constants.exampleProfileNotMapped.fields[0],
      handleMappingChange: action('Select a Persona Field')
    }
    return <AutoCompleteProfileField {...props} />
  }))
  .add('Autocomplete Profile Field mapped to Persona data', withNotes(autoCompleteProfileFieldNotes)(() => {
    specs(() => autoCompleteProfileFieldTests)
    const props = {
      personas: constants.personas,
      selectedPersona: constants.personas[0],
      profile: constants.exampleProfile,
      field: constants.exampleProfile.fields[0],
      handleMappingChange: action('Select a Persona Field')
    }
    return <AutoCompleteProfileField {...props} />
  }))
