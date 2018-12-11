import { vaultReducer, initialState } from './reducer'
import { getType } from 'typesafe-actions'

import * as vaultActions from './actions'
import { Persona } from './types/persona'

describe('Vault Reducer', () => {

  it('adds retrieved personas to the state in response to GetPersonas.success', () => {
    const testPersonas = [
        { address: '111', entry: { name: 'persona1', hash: '111', fields: [] } },
        { address: '222', entry: { name: 'persona1', hash: '222', fields: [] } }]

    expect(vaultReducer(undefined, vaultActions.GetPersonas.success(testPersonas))).toEqual({
      ...initialState,
      personas: testPersonas.map(elem => elem.entry),
      currentPersona: testPersonas[0].entry
    })
  })

  it('adds retrieved profiles to the state in response to GetProfiles.success', () => {

    const testProfiles = [
    { name: 'profile1', id: '1', fields: [], hash: '', expiry: 0, sourceDNA: '' },
    { name: 'profile1', id: '1', fields: [], hash: '', expiry: 0, sourceDNA: '' }]

    expect(vaultReducer(undefined, vaultActions.GetProfiles.success(testProfiles))).toEqual({
      ...initialState,
      profiles: testProfiles
    })
  })

  it('sets the currentPersona on action', () => {

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

  it('does not mutate the state on unknown action', () => {
    expect(vaultReducer(undefined, {
      type: 'NOTACTION',
      payload: { }
    })).toEqual(initialState)
  })

})
