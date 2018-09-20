import { combineReducers } from 'redux'
import  * as constants from './constants'
import * as A from './actions'
import { VaultAction } from './actions'
import {Profile, ProfileSpec, ProfileMapping, Persona} from './types/profile'


// readonly keyword causes compiler to error if one attempts to mutate the state
export type VaultState = {
  readonly userHash: string,
  readonly profileSpec: ProfileSpec,
  readonly profiles: Array<Profile>,
  readonly profile: Profile,
  readonly profileMapping: ProfileMapping,
  readonly personas: Array<Persona>,
  readonly persona: Persona
}

export type State = VaultState

const initialState: State = {
  userHash: 'empty',
  profileSpec: constants.profile1.profileSpec,
  profiles: [constants.profile1, constants.profile6, constants.profile2, constants.profile3, constants.profile4, constants.profile5],
  profile: constants.profile1,
  profileMapping: constants.mapping,
  personas: [], //constants.personas,
  persona: {} // constants.personas[0].persona
}

function vaultReducer (state: VaultState = initialState, action: {type: string, payload: VaultAction}) {
  const { type, payload } = action
  switch (type) {
    case A.PROFILEMAPPINGCREATE:
        return {
          ...state,
          hash: payload
        }
    case A.PERSONACREATE:
        return {
          ...state,
          hash: payload
        }
    case A.PROFILESLIST:
        return {
          ...state,
          profiles: payload
        }
    case A.PERSONASLIST:
      console.log('PERSONASLIST')
      return {
        ...state,
        personas: payload || []
      }
    default:
      return state
  }
}

export default combineReducers({
  profile: vaultReducer
})
