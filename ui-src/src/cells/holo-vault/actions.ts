
import { createHolochainAsyncAction } from '../../utils/hcMiddlewareActions'
import { createAction } from 'typesafe-actions'

import { Persona, PersonaSpec, PersonaField } from './types/persona'
import { ProfileMapping, Profile } from './types/profile'

/*----------  Persona Actions  ----------*/

export const CreatePersona = createHolochainAsyncAction<{spec: PersonaSpec}, string>('holo-chat', 'personas', 'main', 'create_persona')

export const GetPersonas = createHolochainAsyncAction<any, {personas: Array<Persona>}>('holo-chat', 'personas', 'main', 'get_personas')

export const AddField = createHolochainAsyncAction<{persona_address: string, field: PersonaField}, boolean>('holo-chat', 'personas', 'main', 'add_field')

export const DeleteField = createHolochainAsyncAction<{persona_address: string, fieldName: string}, number>('holo-chat', 'personas', 'main', 'delete_field')

export const SetCurrentPersona = createAction('holo-chat/SET_CURRENT_PERSONA', resolve => {
  return (persona: Persona) => resolve(persona)
})

/*----------  Profile Actions  ----------*/

export const GetProfiles = createHolochainAsyncAction<any, {profiles: Array<Profile>}>('holo-chat', 'profiles', 'main', 'get_profiles')

export const CreateMapping = createHolochainAsyncAction<{mapping: ProfileMapping}, number>('holo-chat', 'profiles', 'main', 'create_mapping')

// export const GetProfileFields = createHolochainAsyncAction<Hash, Array<ProfileField>>('holo-vault', 'profiles', 'main', 'get_profile_fields')
