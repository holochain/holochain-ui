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
      profileField: constants.exampleProfile.fields[0],
      profile: constants.exampleProfile,
      personas: constants.personas
    }

    return <FieldMapper {...props} />
  }))
