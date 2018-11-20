import { Message, MessageType } from './types/view/message'

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

export const publicChannels = [
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp',
    'name': 'dev hApps',
    'description': 'dev-happs'
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp',
    'name': 'dev Core',
    'description': 'dev-core'
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp',
    'name': 'Town Central',
    'description': 'Town Central'
  }
]

export const directMessageChannels = [
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp',
    'name': 'philipbeadle, thedavidmeister',
    'description': ''
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp',
    'name': 'ccxxoo',
    'description': ''
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp',
    'name': 'jeanmrussell',
    'description': ''
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp',
    'name': 'zippy',
    'description': ''
  },
  {
    'hash': 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8hasp',
    'name': 'artbrock',
    'description': ''
  }
]

export const messages: Array<Message> = [
  {
    type: MessageType.CHAT,
    author: 'Phil',
    channelId: 'holochain',
    timestamp: 10,
    content: {
      text: 'Hey Micah, how are you doing?'
    },
    replies: [{
      type: MessageType.CHAT,
      author: 'Micah',
      channelId: 'holochain',
      timestamp: 11,
      content: {
        text: 'Buenas dias! good u?'
      },
      replies: []
    }]
  },
  {
    type: MessageType.IDEA,
    author: 'Jean',
    channelId: 'holochain',
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
