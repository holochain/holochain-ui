
import { createHolochainAsyncAction } from '../../utils/holochainAxiosActions'
import { createHolochainAsyncAction as createHolochainAsyncActionWs } from '../../utils/holochainWebsocketActions'

import { Persona, PersonaSpec, PersonaField } from './types/persona'
import { ProfileField, ProfileMapping, Profile } from './types/profile'

type Hash = string

/*----------  Persona Actions  ----------*/

export const CreatePersona = createHolochainAsyncAction<PersonaSpec, string>('holo-vault', 'personas', 'createPersona')

export const GetPersonas = createHolochainAsyncActionWs<any, Array<Persona>>('XXXXXX', 'personas', 'main', 'get_personas')

export const AddField = createHolochainAsyncAction<{personaHash: string, field: PersonaField}, boolean>('holo-vault', 'personas', 'addField')

export const DeleteField = createHolochainAsyncAction< {personaHash: string, fieldName: string}, number>('holo-vault', 'personas', 'deleteField')

/*----------  Profile Actions  ----------*/

export const GetProfiles = createHolochainAsyncAction<any, Array<Profile>>('holo-vault', 'profiles', 'getProfiles')

export const CreateMapping = createHolochainAsyncAction<ProfileMapping, number>('holo-vault', 'profiles', 'createMapping')

export const GetProfileFields = createHolochainAsyncAction<Hash, Array<ProfileField>>('holo-vault', 'profiles', 'getProfileFields')
