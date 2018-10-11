import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { specs } from 'storybook-addon-specifications'
import { withNotes } from '@storybook/addon-notes'
import AutoCompleteProfileField from './autoCompleteProfileField'
import autoCompleteProfileFieldNotes from './autoCompleteProfileFieldNotes.md'
import { autoCompleteProfileFieldTests } from './autoCompleteProfileField.test'

storiesOf('HoloVault/Profile', module)
  .add('Autocomplete Profile Field', withNotes(autoCompleteProfileFieldNotes)(() => {
    specs(() => autoCompleteProfileFieldTests)
    let suggestions = [
      { label: 'Alpha Go' },
      { label: 'Boris Johnson' },
      { label: 'Carl Marks' },
      { label: 'Delphi' },
      { label: 'Estonia' },
      { label: 'Estonia' },
      { label: 'Estonia' },
      { label: 'Franklin, VA' },
      { label: 'Gomez' },
      { label: 'Homer' },
      { label: 'Inglewood, CO' },
      { label: 'Jefferies LTD' }
    ]
    return <AutoCompleteProfileField handleSelectionChange={action('Select a Persona Field')} suggestions={suggestions}/>
  }))
