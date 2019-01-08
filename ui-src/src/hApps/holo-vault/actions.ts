
import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware'
import { createAction } from 'typesafe-actions'

import { Persona, PersonaSpec, PersonaField } from './types/persona'
import { ProfileMapping, Profile } from './types/profile'

/*----------  Persona Actions  ----------*/

export const CreatePersona = createHolochainAsyncAction<{spec: PersonaSpec}, string>(`holo-chat`, 'personas', 'main', 'create_persona')

export const GetPersonas = createHolochainAsyncAction<{}, Array<{address: string, entry: Persona}>>(`holo-chat`, 'personas', 'main', 'get_personas')

export const AddField = createHolochainAsyncAction<{persona_address: string, field: PersonaField}, null>(`holo-chat`, 'personas', 'main', 'add_field')

/*----------  Profile Actions  ----------*/

export const GetProfiles = createHolochainAsyncAction<{}, Array<Profile>>(`holo-chat`, 'profiles', 'main', 'get_profiles')

export const CreateMapping = createHolochainAsyncAction<{mapping: ProfileMapping}, {mappings_created: number}>(`holo-chat`, 'profiles', 'main', 'create_mapping')

// export const GetProfileFields = createHolochainAsyncAction<Hash, Array<ProfileField>>(`holo-chat`, 'profiles', 'main', 'get_profile_fields')

/*----------  non holochain actions  ----------*/

export const SetCurrentPersona = createAction('holo-vault/SET_CURRENT_PERSONA', resolve => {
  return (persona: Persona) => resolve(persona)
})

export const SetCurrentProfile = createAction('holo-vault/SET_CURRENT_PROFILE', resolve => {
  return (profile: Profile) => resolve(profile)
})
