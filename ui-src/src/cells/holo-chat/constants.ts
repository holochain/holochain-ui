import {Message, MessageType} from './types/view/message'

export const profileSpec1 = {
  "id": "HoloChat [Holo Team]",
  "sourceDna": "QmZ4CP5unaghnmxbJkSBwobehgcF5VdcKLPimXEkwVTUYh",
  "type": "object",
  "expiry": "2018-12-12T01:01:10+00:00",
  "requiredFields": ["firstname", "address", "suburb"],
  "profile": [
    {
      "appLabel": "handle",
      "display": "Handle",
      "required": true,
      "type": "string",
      "usage": [
        {
          "type": "index",
          "reason": "So we can link to when you are mentioned and people request to follow you"
        }
      ]
    },
    {
      "appLabel": "firstName",
      "display": "First Name",
      "required": true,
      "type": "string",
      "usage": [
        {
          "type": "index",
          "reason": "So we can find you to collaborate"
        }
      ]
    },
    {
      "appLabel": "lastName",
      "display": "Last Name",
      "required": true,
      "type": "string",
      "usage": [
        {
          "type": "index",
          "reason": "So we can find you to collaborate"
        }
      ]
    }
  ]
}
export const messages: Array<Message> = [
    {
      type: MessageType.CHAT,
      channelId: 'holochain',
      author: 'Art Brock',
      timestamp: 10,
      content: {
        text: 'Text message with an imageText message with an imageText message with an imageText message with an image',
      },
      replies: []
    },
    {
      type: MessageType.CHAT,
      channelId: 'holochain',
      author: 'Art Brock',
      timestamp: 20,
      content: {
        text: 'Text message with no image',
        image: ''
      },
      replies: []
    }
  ]
