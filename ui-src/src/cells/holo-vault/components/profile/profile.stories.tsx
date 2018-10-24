import * as React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { specs } from 'storybook-addon-specifications'
import { withNotes } from '@storybook/addon-notes'
import Profile, { Props } from './profile'
// import { Profile as ProfileType } from '../../types/profile'
import profileNotes from './profileNotes.md'
import { profileTests } from './profile.test'
import * as constants from '../../constants'
// import CreateStore from '../../../../store'

// let store = CreateStore()
const mockPromise = jest.fn(() => Promise.reject(''))

storiesOf('HoloVault/Profile', module)
  .add('Not mapped no defaults', withNotes(profileNotes)(() => {
    specs(() => profileTests)
    let props: Props
    props = {
      personas: constants.personas,
      profile: constants.exampleProfileNotMappedNoDefaults,
      profiles: [],
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise
    }
    return <MemoryRouter initialEntries={['/']}><Profile {...props} /></MemoryRouter>
  }))
  .add('Not mapped has matching defaults', withNotes(profileNotes)(() => {
    // specs(() => profileTests)
    let props: Props
    props = {
      personas: constants.personas,
      profile: constants.exampleProfileNotMapped,
      profiles: [],
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise
    }
    return <MemoryRouter initialEntries={['/']}><Profile {...props} /></MemoryRouter>
  }))
  .add('Mapped to Persona info', withNotes(profileNotes)(() => {
    // specs(() => profileTests)
    let props: Props
    props = {
      personas: constants.personas,
      profile: constants.exampleProfileMappedCorrectly,
      profiles: [],
      save: mockPromise,
      getProfiles: mockPromise,
      getPersonas: mockPromise
    }
    return <MemoryRouter initialEntries={['/']}><Profile {...props} /></MemoryRouter>
  }))
