import { ActionType, getType } from 'typesafe-actions'

import { combineReducers } from 'redux'

import * as vaultActions from './actions'

import { Profile, ProfileField } from './types/profile'
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
      console.log(action)
      let personas = action.payload.map((elem: any) => { return { ...elem.entry, hash: elem.address } })

      let currentPersona = personas.filter((persona: Persona) => persona.name === 'Default')[0] || personas[0] || undefined

      return {
        ...state,
        personas,
        currentPersona
      }
    case getType(vaultActions.GetProfiles.success):
      return {
        ...state,
        profiles: action.payload.map((profile: Profile) => {
          const fields = profile.fields.map((field: ProfileField) => {
            return {
              ...field,
              mapping: field.mapping ? field.mapping : undefined
            }
          })
          return { ...profile, fields }
        })
      }
    case getType(vaultActions.SetCurrentPersona):
      return {
        ...state,
        currentPersona: action.payload
      }
    case getType(vaultActions.SetCurrentProfile):
      return {
        ...state,
        currentProfile: action.payload
      }
    default:
      return state
  }
}

export default combineReducers({
  profile: vaultReducer
})
