import { Message } from './types/model/message'
import { Stream } from './types/model/stream'
import { Subject } from './types/model/subject'

export const profileSpec1 = {
  'id': 'HoloChat [Holo Team]',
  'sourceDna': 'QmZ4CP5unaghnmxbJkSBwobehgcF5VdcKLPimXEkwVTUYh',
  'type': 'object',
  'expiry': '2018-12-12T01:01:10+00:00',
  'requiredFields': ['firstname', 'address', 'suburb'],
  'profile': [
    {
      'appLabel': 'handle',
      'display': 'Handle',
      'required': true,
      'type': 'string',
      'usage': [
        {
          'type': 'index',
          'reason': 'So we can link to when you are mentioned and people request to follow you'
        }
      ]
    },
    {
      'appLabel': 'firstName',
      'display': 'First Name',
      'required': true,
      'type': 'string',
      'usage': [
        {
          'type': 'index',
          'reason': 'So we can find you to collaborate'
        }
      ]
    },
    {
      'appLabel': 'lastName',
      'display': 'Last Name',
      'required': true,
      'type': 'string',
      'usage': [
        {
          'type': 'index',
          'reason': 'So we can find you to collaborate'
        }
      ]
    }
  ]
}

export const streams: Array<Stream> = [
  {
    'address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    'name': 'dev hApps',
    'public': true,
    'description': 'dev-happs'
  },
  {
    'address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devCore',
    'name': 'dev Core',
    'public': true,
    'description': 'dev-core'
  },
  {
    'address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Town',
    'name': 'Town Central',
    'public': true,
    'description': 'Town Central'
  },
  {
    'address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp1',
    'name': 'philipbeadle, thedavidmeister',
    'public': false,
    'description': ''
  },
  {
    'address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp2',
    'name': 'ccxxoo',
    'public': false,
    'description': ''
  },
  {
    'address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp3',
    'name': 'jeanmrussell',
    'public': false,
    'description': ''
  },
  {
    'address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp4',
    'name': 'zippy',
    'public': false,
    'description': ''
  },
  {
    'address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp5',
    'name': 'artbrock',
    'public': false,
    'description': ''
  }
]

export const subjects: Array<Subject> = [
  {
    'stream_address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    'address': 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8AoP',
    'name': 'Abundance of Presence',
    'unread': 3
  },
  {
    'stream_address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    'address': 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Videos',
    'name': 'Videos',
    'unread': 2
  },
  {
    'stream_address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    'address': 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Standup',
    'name': 'Standup',
    'unread': 1
  },
  {
    'stream_address': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Town',
    'address': 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Bitcoin',
    'name': 'Bitcoin',
    'unread': 1
  }
]

export const messages: Array<Message> = [
  {
    message_type: 'text',
    author: 'philipbeadle',
    timestamp: 10,
    payload: 'Lets add a subject to each message so we can gete some context happening',
    meta: ''
  },
  {
    message_type: 'text',
    author: 'philipbeadle',
    timestamp: 10,
    payload: 'Lets add a subject to each message so we can gete some context happening',
    meta: ''
  }
]
