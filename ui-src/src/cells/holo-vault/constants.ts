import { Persona as PersonaType } from './types/persona'
import { Profile, UsageType, ProfileMapping } from './types/profile'

/*----------  Personas  ----------*/

export const personas: Array<PersonaType> = [
  {
    hash: 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7',
    name: 'Personal',
    fields: [
        { name: 'firstName', data: 'Phil' },
        { name: 'lastName', data: 'Beadle' },
        { name: 'address', data: '123 Holochain Road' },
        { name: 'suburb', data: 'Burwood' },
        { name: 'city', data: 'Melbourne' }
    ]
  },
  {
    hash: 'QmYQLnffCXXrYVdmFqKhryV4XBULunhGNoRzvrywyJen5C',
    name: 'Work',
    fields: [
        { name: 'firstName', data: 'Philip' },
        { name: 'lastName', data: 'Beadle' },
        { name: 'role', data: 'Engineer' },
        { name: 'location', data: 'Melbourne' }
    ]
  },
  {
    hash: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr',
    name: 'Friends',
    fields: [
        { name: 'nickName', data: '@philt3r' },
        { name: 'hobby', data: 'DJ' }
    ]
  }
]

/*----------  Profiles  ----------*/

export const exampleProfile: Profile = {
  name:  'Holo-Chat',
  hash: 'QQQ',
  expiry: 10,
  sourceDNA:  'DNAXYZ',
  fields: [
    {
      name: 'handle',
      displayName: 'Handle',
      required: true,
      description: 'How other users will see you',
      usage: UsageType.STORE,
      schema: { 'type': 'string' },
      mapping: {
        personaHash: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr', // implies field is already mapped
        personaFieldName: 'nickName'
      }
    },
    {
      name: 'first_name',
      displayName: 'First Name',
      required: false,
      description: 'Your actual first name shared with contacts',  // unmapped field
      usage: UsageType.DISPLAY,
      schema: { 'type': 'string' }
    },
    {
      name: 'last_name',
      displayName: 'Last Name',
      required: false,
      description: 'Your actual last name shared with contacts',  // unmapped field
      usage: UsageType.STORE,
      schema: { 'type': 'string' }
    }
  ]
}

export const exampleHandleMapping: ProfileMapping = {
  retrieverDNA:  'DNAXYZ',
  profileFieldName: 'handle',
  personaHash: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr',
  personaFieldName: 'nickName'
}

export const exampleFirstNameMapping: ProfileMapping = {
  retrieverDNA:  'DNAXYZ',
  profileFieldName: 'first_name',
  personaHash: 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7',
  personaFieldName: 'firstName'
}

export const exampleFaultyProfile: Profile = {
  name:  'Holo-Chat',
  hash: 'QQQ',
  expiry: 10,
  sourceDNA:  'DNAXYZ2',
  fields: [
    {
      name: 'handle',
      displayName: 'Handle',
      required: true,
      description: 'How other users will see you',
      usage: UsageType.STORE,
      schema: { 'type': 'string' },
      mapping: {
        personaHash: 'doiesnotexist', // implies field is already mapped
        personaFieldName: 'nickName'
      }
    },
    {
      name: 'first_name',
      displayName: 'First Name',
      required: false,
      description: 'Your actual first name shared with contacts',  // unmapped field
      usage: UsageType.DISPLAY,
      schema: { 'type': 'string' },
      mapping: {
        personaHash: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr', // implies field is already mapped
        personaFieldName: 'doesnotexist'
      }
    },
    {
      name: 'last_name',
      displayName: 'Last Name',
      required: false,
      description: 'Your actual last name shared with contacts',  // unmapped field
      usage: UsageType.STORE,
      schema: { 'type': 'string' }
    }
  ]
}

export const exampleProfileNotMapped: Profile = {
  name:  'Holo-Chat',
  hash: 'QQQ',
  expiry: 10,
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
      description: 'Your actual first name shared with contacts',  // unmapped field
      usage: UsageType.DISPLAY,
      schema: { 'type': 'string' }
    },
    {
      name: 'last_name',
      displayName: 'Last Name',
      required: false,
      description: 'Your actual last name shared with contacts',  // unmapped field
      usage: UsageType.STORE,
      schema: { 'type': 'string' }
    }
  ]
}

export const exampleProfileMappedCorrectly: Profile = {
  name:  'Holo-Chat',
  hash: 'QQQ',
  expiry: 10,
  sourceDNA:  'DNAXYZ',
  fields: [
    {
      name: 'handle',
      displayName: 'Handle',
      required: true,
      description: 'How other users will see you',
      usage: UsageType.STORE,
      schema: { 'type': 'string' },
      mapping: {
        personaHash: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr', // implies field is already mapped
        personaFieldName: 'nickName'
      }
    },
    {
      name: 'first_name',
      displayName: 'First Name',
      required: false,
      description: 'Your actual first name shared with contacts',  // unmapped field
      usage: UsageType.DISPLAY,
      schema: { 'type': 'string' },
      mapping: {
        personaHash: 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7', // implies field is already mapped
        personaFieldName: 'firstName'
      }
    },
    {
      name: 'last_name',
      displayName: 'Last Name',
      required: false,
      description: 'Your actual last name shared with contacts',  // unmapped field
      usage: UsageType.STORE,
      schema: { 'type': 'string' },
      mapping: {
        personaHash: 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7', // implies field is already mapped
        personaFieldName: 'lastName'
      }
    }
  ]
}
