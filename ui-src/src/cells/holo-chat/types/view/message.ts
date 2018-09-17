import {Message as ModelMessage} from '../model/message'
import {Identity} from '../model/identity'

export type Message = ModelMessage & { type: MessageType } | any

export function modelMessagesToViewMessages(messages: Array<ModelMessage>, members: Array<Identity>, myHash: string): Array<Message> {
	
	if(!Array.isArray(messages)) {
		return [] //TODO: find out why this is happening and make a better fix
	}

	const memberMap = members.reduce((obj, item) => {
     obj[item.hash] = item
     return obj
  }, {})

  return messages.map((m) => {
  	const fromMe = m.author! === myHash
  	return {
  		...m, 
  		author: memberMap[m.author!] || {handle: '?', avatar: ''},
  		type: MessageType.CHAT,
  		replies: [],
  		fromMe
  	}
  	}) as Array<Message>
}


export enum MessageType {
	CHAT,
	IDEA
}