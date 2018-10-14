import { Persona as PersonaType, PersonaField as PersonaFieldType } from './persona'

export interface Suggestion {
  persona: PersonaType
  field: PersonaFieldType,
  label: string
}
