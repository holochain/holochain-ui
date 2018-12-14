import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { specs } from 'storybook-addon-specifications'
import FieldMapper from './fieldMapper'
import { fieldMapperTests } from './fieldMapper.test'
import * as constants from '../../constants'

storiesOf('HoloVault/Profile/FieldMapper', module)
  .add('Renders with a mapped profile field and personas', (() => {
    specs(() => fieldMapperTests)

    const props = {
      field: constants.exampleProfileMappedCorrectly.fields[0],
      profile: constants.exampleProfileMappedCorrectly,
      personas: constants.personas,
      selectedPersona: constants.personas[0]
    }

    return <FieldMapper {...props} />
  }))
  .add('Populates an unmapped Profile with data field, persona field and field name field if a match is found in any persona', (() => {
    // specs(() => fieldMapperTests)

    const props = {
      field: constants.exampleProfileNotMapped.fields[0],
      profile: constants.exampleProfileNotMapped,
      personas: constants.personas,
      selectedPersona: constants.personas[0]
    }

    return <FieldMapper {...props} />
  }))
  .add('Sets the persona field to Default and field name to the field if a match is not found in any persona', (() => {
    // specs(() => fieldMapperTests)

    const props = {
      field: constants.exampleProfileNotMappedNoDefaults.fields[0],
      profile: constants.exampleProfileNotMappedNoDefaults,
      personas: constants.personas,
      selectedPersona: constants.personas[0]
    }

    return <FieldMapper {...props} />
  }))
