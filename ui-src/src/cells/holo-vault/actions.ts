
import { createHolochainAsyncAction } from '../../utils/holochainAxiosActions'

import { Persona, PersonaSpec, PersonaField } from './types/persona'
import { ProfileField, ProfileMapping, Profile } from './types/profile'

type Hash = string

/*----------  Persona Actions  ----------*/

export const CreatePersona = createHolochainAsyncAction<{spec: PersonaSpec}, string>('holo-vault', 'personas', 'main', 'create_persona')

export const GetPersonas = createHolochainAsyncAction<any, {personas: Array<Persona>}>('holo-vault', 'personas', 'main', 'get_personas')

export const AddField = createHolochainAsyncAction<{persona_address: string, field: PersonaField}, boolean>('holo-vault', 'personas', 'main', 'add_field')

export const DeleteField = createHolochainAsyncAction<{persona_address: string, fieldName: string}, number>('holo-vault', 'personas', 'main', 'delete_field')

/*----------  Profile Actions  ----------*/

export const GetProfiles = createHolochainAsyncAction<any, Array<Profile>>('holo-vault', 'profiles', 'main', 'getProfiles')

export const CreateMapping = createHolochainAsyncAction<ProfileMapping, number>('holo-vault', 'profiles', 'main', 'createMapping')

export const GetProfileFields = createHolochainAsyncAction<Hash, Array<ProfileField>>('holo-vault', 'profiles', 'main', 'getProfileFields')
