
import { createHolochainAsyncAction } from '../../utils/holochainAxiosActions'

import { Persona, PersonaSpec, PersonaField } from './types/persona'
import { ProfileField, ProfileMapping, Profile } from './types/profile'

type Hash = string

/*----------  Persona Actions  ----------*/

export const CreatePersona = createHolochainAsyncAction<PersonaSpec, string>('holo-vault', 'personas', 'main', 'createPersona')

export const GetPersonas = createHolochainAsyncAction<any, {persona_addresses: Array<Persona>}>('holo-vault', 'personas', 'main', 'get_personas')

export const AddField = createHolochainAsyncAction<{personaHash: string, field: PersonaField}, boolean>('holo-vault', 'personas', 'main', 'addField')

export const DeleteField = createHolochainAsyncAction< {personaHash: string, fieldName: string}, number>('holo-vault', 'personas', 'main', 'deleteField')

/*----------  Profile Actions  ----------*/

export const GetProfiles = createHolochainAsyncAction<any, Array<Profile>>('holo-vault', 'profiles', 'main', 'getProfiles')

export const CreateMapping = createHolochainAsyncAction<ProfileMapping, number>('holo-vault', 'profiles', 'main', 'createMapping')

export const GetProfileFields = createHolochainAsyncAction<Hash, Array<ProfileField>>('holo-vault', 'profiles', 'main', 'getProfileFields')
