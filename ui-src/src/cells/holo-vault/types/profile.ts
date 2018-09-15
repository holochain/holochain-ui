import { JSONSchema6 } from 'json-schema'


export interface Profile {
    sourceDNA: string,
    mappings: Array<FieldMapping>
}

export interface FieldMapping {
    name: string,
    personaId: string, // ID of the persona to retrieve this from
    targetFieldName: string // field to retrieve from this persona
    spec: FieldSpec // specification for the field. Used to revalidate if changed
}

export interface Persona {
    id: string,
    name: string,
    fields: Array<{name: string, data: any}>
}

export interface ProfileSpec {
    sourceDNA: string, // the DNA of the hApp requesting data
    fields: Array<FieldSpec>, // array of fields this app requires
}

export interface FieldSpec {
    name: string,
    required: boolean,
    description: string, // describes what the app will do with this data
    schema: JSONSchema6 // field must pass this validator to be accepted
}