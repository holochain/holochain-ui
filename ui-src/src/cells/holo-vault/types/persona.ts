

export interface PersonaSpec {
	name: string
	id: string
}

export interface Persona extends PersonaSpec {
	hash: string
	fields: Array<Field>
}

export interface Field {
    name: string,
    data: any
}