import { Persona as PersonaType } from './types/persona'
import { ProfileSpec, UsageType, ProfileMapping } from './types/profile'
export const personas: Array<PersonaType> = [
  {
    'hash': 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7',
    'name': 'Personal',
    'fields': [
        { 'name': 'firstName', 'data': 'Phil' },
        { 'name': 'lastName', 'data': 'Beadle' },
        { 'name': 'address', 'data': '123 Holochain Road' },
        { 'name': 'suburb', 'data': 'Burwood' },
        { 'name': 'city', 'data': 'Melbourne' }
    ]
  },
  {
    'hash': 'QmYQLnffCXXrYVdmFqKhryV4XBULunhGNoRzvrywyJen5C',
    'name': 'Work',
    'fields': [
        { 'name': 'firstName', 'data': 'Philip' },
        { 'name': 'lastName', 'data': 'Beadle' },
        { 'name': 'role', 'data': 'Engineer' },
        { 'name': 'location', 'data': 'Melbourne' }
    ]
  },
  {
    'hash': 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr',
    'name': 'Friends',
    'fields': [
        { 'name': 'nickName', 'data': '@philt3r' },
        { 'name': 'hobby', 'data': 'DJ' }
    ]
  }
]

export const exampleProfileSpec: ProfileSpec = {
  name:  'Holo-Chat',
  sourceDNA:  'DNAXYZ',
  fields: [
    {
      name: 'handle',
      displayName: 'Handle',
      required: true,
      description: 'How other users will see you',
      usage: UsageType.STORE,
      schema: { 'type': 'string' }
    },
    {
      name: 'first_name',
      displayName: 'First Name',
      required: false,
      description: 'Your actual first name shared with contacts',
      usage: UsageType.DISPLAY,
      schema: { 'type': 'string' }
    }
  ]
}

export const exampleHandleMapping: ProfileMapping = {
  retrieverDNA:  'DNAXYZ',
  profileField: 'handle',
  personaHash: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr',
  personaField: 'nickName'
}

export const exampleFirstNameMapping: ProfileMapping = {
  retrieverDNA:  'DNAXYZ',
  profileField: 'first_name',
  personaHash: 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7',
  personaField: 'firstName'
}
