import { vaultReducer, initialState } from './reducer'
import { getType } from 'typesafe-actions'
import { AxiosResponse } from 'axios'

import * as vaultActions from './actions'
import { Persona } from './types/persona'

describe('Vault Reducer', () => {

  it('adds retrieved personas to the state in response to GetPersonas.success', () => {
    expect(vaultReducer(undefined, {
      type: getType(vaultActions.GetPersonas.success),
      payload: {
        data: {
          personas: [{ name: 'persona1', hash: '1' }, { name: 'Default', hash: '2' }]
        }
      } as AxiosResponse
    })).toEqual({
      ...initialState,
      personas: [{ name: 'persona1', hash: '1' }, { name: 'Default', hash: '2' }],
      currentPersona: { name: 'Default', hash: '2' }
    })
  })

  it('adds retrieved profiles to the state in response to GetProfiles.success', () => {
    expect(vaultReducer(undefined, {
      type: getType(vaultActions.GetProfiles.success),
      payload: {
        data: {
          profiles: [{ name: 'profile1', id: '1', fields: [] }, { name: 'profile1', id: '2', fields: [] }] // not real profile data
        }
      } as AxiosResponse
    })).toEqual({
      ...initialState,
      profiles: [{ name: 'profile1', id: '1', fields: [] }, { name: 'profile1', id: '2', fields: [] }]
    })
  })

  it('sets the currentPersona on action', () => {
    expect(vaultReducer(undefined, {
      type: 'NOTACTION',
      payload: {
        data: {}
      } as AxiosResponse
    })).toEqual(initialState)
  })

  it('does not mutate the state on unknown action', () => {

    const persona: Persona = {
      hash: 'HASH',
      fields: [],
      name: 'persona'
    }

    expect(vaultReducer(undefined, {
      type: getType(vaultActions.SetCurrentPersona),
      payload: persona
    })).toEqual({
      ...initialState,
      currentPersona: persona
    })
  })
})
