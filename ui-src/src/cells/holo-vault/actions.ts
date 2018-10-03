
import {createHolochainAsyncAction} from '../../utils/holochainAxiosActions'

import { Persona, PersonaSpec, PersonaField } from './types/persona'
import { ProfileSpec, ProfileField } from './types/profile'

type Hash = string;

/*----------  Persona Actions  ----------*/

export const CreatePersona = createHolochainAsyncAction<PersonaSpec, string>('holo-vault', 'personas', 'createPersona');

export const GetPersonas = createHolochainAsyncAction<any, Array<Persona>>('holo-vault', 'personas', 'getPersonas');

export const AddField = createHolochainAsyncAction<{personaHash: string, field: PersonaField}, boolean>('holo-vault', 'personas', 'addField');

export const DeleteField = createHolochainAsyncAction< {personaHash: string, fieldName: string}, number>('holo-vault', 'personas', 'deleteField');

/*----------  Profile Actions  ----------*/

export const RegisterApp = createHolochainAsyncAction<ProfileSpec, boolean>('holo-vault', 'profiles', 'registerApp');

export const GetProfileSpecs = createHolochainAsyncAction<any, Array<ProfileSpec>>('holo-vault', 'profiles', 'getProfileSpec');

export const CreateMapping = createHolochainAsyncAction<{appDNA: Hash, profileField: string, personaId: string, personaField: string}, number>('holo-vault', 'profiles', 'createMapping');

export const GetProfileFields = createHolochainAsyncAction<Hash, Array<ProfileField>>('holo-vault', 'profiles', 'getProfileFields');

export const Retrieve = createHolochainAsyncAction<{appDNA: string, profileField: string}, any>('holo-vault', 'profiles', 'retrieve');
