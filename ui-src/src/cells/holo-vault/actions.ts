
import {createHolochainAsyncAction} from '../../utils/holochainAxiosActions'

import { Persona, PersonaSpec, PersonaField } from './types/persona'



/*----------  Persona Actions  ----------*/

export const CreatePersona = createHolochainAsyncAction<PersonaSpec, string>('holo-vault', 'personas', 'createPersona');

export const GetPersonas = createHolochainAsyncAction<any, Array<Persona>>('holo-vault', 'personas', 'getPersonas');

export const AddField = createHolochainAsyncAction<{personaHash: string, field: PersonaField}, boolean>('holo-vault', 'personas', 'addField');

export const DeleteField = createHolochainAsyncAction< {personaHash: string, fieldName: string}, number>('holo-vault', 'personas', 'deleteField');

/*----------  Profile Actions  ----------*/
