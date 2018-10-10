import { vaultReducer, initialState } from './reducer'
import { getType } from 'typesafe-actions'
import { AxiosResponse } from 'axios'

import * as vaultActions from './actions'
// import { Persona } from './types/persona'

describe('Vault Reducer', () => {

  it('adds retrieved personas to the state in response to GetMyChannels.success', () => {
    expect(vaultReducer(undefined, {
      type: getType(vaultActions.GetPersonas.success),
      payload: {
        data: [{ name: 'persona1', id: '1' }, { name: 'persona2', id: '2' }]
      } as AxiosResponse
    })).toEqual({
      ...initialState,
      personas: [{ name: 'persona1', id: '1' }, { name: 'persona2', id: '2' }]
    })
  })

  it('adds retrieved profiles to the state in response to GetProfiles.success', () => {
    expect(vaultReducer(undefined, {
      type: getType(vaultActions.GetProfiles.success),
      payload: {
        data: [{ name: 'profile1', id: '1' }, { name: 'profile1', id: '2' }] // not real profile data
      } as AxiosResponse
    })).toEqual({
      ...initialState,
      profiles: [{ name: 'profile1', id: '1' }, { name: 'profile1', id: '2' }]
    })
  })

  it('does not mutate the state on unknown action', () => {
    expect(vaultReducer(undefined, {
      type: 'NOTACTION',
      payload: {
        data: {}
      } as AxiosResponse
    })).toEqual(initialState)
  })
})
