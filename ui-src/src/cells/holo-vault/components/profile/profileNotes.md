** New Profile **
When a new profile is requested by a hApp the Profile Spec is used to create a form with Auto Complete Fields that
enable you to select the answers from your existing Persona data or enter new info.

A profile Spec looks like this and is created by the hApp developer.

```
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
```
