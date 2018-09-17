import { JSONSchema6 } from 'json-schema'


export interface ProfileSpec {
    sourceDNA: string, // the DNA of the hApp requesting data
    fields: Array<FieldSpec>, // array of fields this app requires
}

export interface FieldSpec {
    name: string, // How the app will ask for this data
    displayName: string, // How it will be displayed in user forms
    required: boolean,
    description: string, // describes what the app will do with this data
    usage: UsageType, // how the app will use the data.
    schema: JSONSchema6 // field must pass this validator to be accepted
}

export enum UsageType {
    STORE="store",    // The app will store the data in its own DHT
    DISPLAY="display", // The app will always bridge to vault when it needs to retreive the data
}

export interface Profile extends ProfileSpec {
    fields: Array<ProfileField>
}

export interface ProfileField extends FieldSpec {
    personaId?: string, // id of the persona to map to. If not provided then an error will be thrown on access
    personaFieldName?: string // field of persona to map to
}