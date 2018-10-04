
export interface PersonaSpec {
  name: string
  id?: string
}

export interface Persona extends PersonaSpec {
  hash: string
  fields: Array<PersonaField>
}

export interface PersonaField {
  name: string,
  data: any
}
