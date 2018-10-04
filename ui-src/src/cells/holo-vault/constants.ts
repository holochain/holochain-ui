import { Persona as PersonaType } from './types/persona'
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
