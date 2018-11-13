import * as React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { specs } from 'storybook-addon-specifications'
import { withNotes } from '@storybook/addon-notes'
import Profiles, { Props } from './profiles'
import listProfiles from './listProfiles.md'
import * as constants from '../../constants'
import { profilesTests } from './profiles.test'

// import CreateStore from '../../../../store'

// let store = CreateStore()
const mockPromise = jest.fn(() => Promise.reject(''))

storiesOf('HoloVault/Profile', module)
  .add('List of Profiles', withNotes(listProfiles)(() => {
    specs(() => profilesTests)
    let props: Props
    props = {
      profiles: [constants.exampleProfileMappedCorrectly, constants.exampleProfileNotMappedNoDefaultsManualMap, constants.exampleProfileNotMappedNoDefaults],
      getProfiles: mockPromise
    }
    return <MemoryRouter initialEntries={['/']}><Profiles {...props} /></MemoryRouter>
  }))
