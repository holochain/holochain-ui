import { Message, MessageType } from './types/view/message'
import { Channel } from './types/model/channel'

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

export const channels: Array<Channel> = [
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    'name': 'dev hApps',
    'isPublic': true,
    'description': 'dev-happs'
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devCore',
    'name': 'dev Core',
    'isPublic': true,
    'description': 'dev-core'
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Town',
    'name': 'Town Central',
    'isPublic': true,
    'description': 'Town Central'
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp1',
    'name': 'philipbeadle, thedavidmeister',
    'isPublic': false,
    'description': ''
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp2',
    'name': 'ccxxoo',
    'isPublic': false,
    'description': ''
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp3',
    'name': 'jeanmrussell',
    'isPublic': false,
    'description': ''
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp4',
    'name': 'zippy',
    'isPublic': false,
    'description': ''
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp5',
    'name': 'artbrock',
    'isPublic': false,
    'description': ''
  }
]

export const subjects = [
  {
    'channelAddress': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    'address': 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8AoP',
    'subject': 'Abundance of Presence',
    'unread': 3
  },
  {
    'channelAddress': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    'address': 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Videos',
    'subject': 'Videos',
    'unread': 2
  },
  {
    'channelAddress': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    'address': 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Standup',
    'subject': 'Standup',
    'unread': 1
  },
  {
    'channelAddress': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Town',
    'address': 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Bitcoin',
    'subject': 'Bitcoin',
    'unread': 1
  }
]

export const messages: Array<Message> = [
  {
    type: MessageType.CHAT,
    author: 'Phil',
    channelAddress: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    subjectAddress: 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8AoP',
    timestamp: 10,
    content: {
      text: 'Lets add a subject to each message so we can gete some context happening'
    }
  },{
    type: MessageType.CHAT,
    author: 'Phil',
    channelAddress: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    subjectAddress: 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8AoP',
    timestamp: 10,
    content: {
      text: 'Lets add a subject to each message so we can gete some context happening'
    }
  },
  {
    type: MessageType.IDEA,
    author: 'Jean',
    channelAddress: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
    subjectAddress: 'Qm8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8Videos',
    timestamp: 10,
    content: {
      upVotes: 33,
      downVotes: 0,
      description: 'New Channel feature makes it intuitive to add new channels with members.',
      avatar: '',
      productOwner: 'Phil',
      title: 'New Channel'
    },
    replies: []
  }
]
