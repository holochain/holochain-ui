import { ActionType, getType } from 'typesafe-actions'

import { combineReducers } from 'redux'

import * as vaultActions from './actions'

import { Profile } from './types/profile'
import { Persona } from './types/persona'

export type VaultAction = ActionType<typeof vaultActions>

// readonly keyword causes compiler to error if one attempts to mutate the state
export type VaultState = {

  readonly profiles: Array<Profile>,
  readonly currentProfile?: Profile,

  readonly personas: Array<Persona>,
  readonly currentPersona?: Persona
}

export type State = VaultState

export const initialState: State = {
  profiles: [],
  currentProfile: undefined,

  personas: [],
  currentPersona: undefined
}

export function vaultReducer (state: VaultState = initialState, action: VaultAction) {
  switch (action.type) {
    case getType(vaultActions.GetPersonas.success):
      return {
        ...state,
        personas: action.payload.data
      }
    case getType(vaultActions.GetProfiles.success):
      return {
        ...state,
        profiles: action.payload.data
      }
    default:
      return state
  }
}

export default combineReducers({
  profile: vaultReducer
})
