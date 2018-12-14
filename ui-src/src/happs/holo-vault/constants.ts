import { Persona as PersonaType } from './types/persona'
import { Profile, UsageType, ProfileMapping } from './types/profile'

/*----------  Personas  ----------*/

export const personas: Array<PersonaType> = [
  {
    hash: 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtXXXXX',
    name: 'Default',
    fields: [
        { name: 'handle', data: '@philt3r' },
        { name: 'first_name', data: 'Phil' },
        { name: 'last_name', data: 'Beadle' }
    ]
  },
  {
    hash: 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7',
    name: 'Personal',
    fields: [
        { name: 'first_name', data: 'Phil' },
        { name: 'last_name', data: 'Beadle' },
        { name: 'address', data: '123 Holochain Road' },
        { name: 'suburb', data: 'Burwood' },
        { name: 'city', data: 'Melbourne' }
    ]
  },
  {
    hash: 'QmYQLnffCXXrYVdmFqKhryV4XBULunhGNoRzvrywyJen5C',
    name: 'Work',
    fields: [
        { name: 'first_name', data: 'Philip' },
        { name: 'last_name', data: 'Beadle' },
        { name: 'role', data: 'Engineer' },
        { name: 'location', data: 'Melbourne' }
    ]
  },
  {
    hash: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr',
    name: 'Friends',
    fields: [
        { name: 'nick_name', data: '@philt3r' },
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
        personaAddress: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr', // implies field is already mapped
        personaFieldName: 'nick_name'
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
  personaAddress: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr',
  personaFieldName: 'nickName'
}

export const exampleFirstNameMapping: ProfileMapping = {
  retrieverDNA:  'DNAXYZ',
  profileFieldName: 'first_name',
  personaAddress: 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7',
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
        personaAddress: 'doiesnotexist', // implies field is already mapped
        personaFieldName: 'nick_name'
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
        personaAddress: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr', // implies field is already mapped
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

export const exampleProfileNotMappedNoDefaults: Profile = {
  name:  'Holo-Chat',
  hash: 'QQQ',
  expiry: 10,
  sourceDNA:  'DNAXYZ',
  fields: [
    {
      name: 'genre',
      displayName: 'Genre',
      required: true,
      description: 'Your favourite music genre',
      usage: UsageType.STORE,
      schema: { 'type': 'string' }
    },
    {
      name: 'no_default',
      displayName: 'No Default Value',
      required: false,
      description: 'No default persona value',  // unmapped field
      usage: UsageType.DISPLAY,
      schema: { 'type': 'string' }
    }
  ]
}

export const exampleProfileNotMappedNoDefaultsManualMap: Profile = {
  name:  'Errand',
  hash: 'QQQ',
  expiry: 10,
  sourceDNA:  'DNAXYZErrand',
  fields: [
    {
      name: 'locale',
      displayName: 'Locale',
      required: true,
      description: 'Your preferred language',
      usage: UsageType.DISPLAY,
      schema: { 'type': 'string' }
    },
    {
      name: 'no_default',
      displayName: 'No Default Value',
      required: false,
      description: 'No default persona value',  // unmapped field
      usage: UsageType.DISPLAY,
      schema: { 'type': 'string' }
    }
  ]
}

export const exampleProfileMappedCorrectly: Profile = {
  name:  'Holo-Git',
  hash: 'QQQ',
  expiry: 10,
  sourceDNA:  'DNAXYZ123',
  fields: [
    {
      name: 'handle',
      displayName: 'Handle',
      required: true,
      description: 'How other users will see you',
      usage: UsageType.STORE,
      schema: { 'type': 'string' },
      mapping: {
        personaAddress: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr', // implies field is already mapped
        personaFieldName: 'nick_name'
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
        personaAddress: 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7', // implies field is already mapped
        personaFieldName: 'first_name'
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
        personaAddress: 'QmZqtKMs4pg9veqv3p4Sxzkgv2rdR7XoSn2TrLtAPLPSL7', // implies field is already mapped
        personaFieldName: 'last_name'
      }
    }
  ]
}
