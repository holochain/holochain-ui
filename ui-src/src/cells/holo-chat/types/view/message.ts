import {Message as ModelMessage} from '../model/message'

export type Message = ModelMessage & { type: MessageType } | any

export function modelMessagesToViewMessages(messages: Array<ModelMessage>): Array<Message> {
  return messages.map((m) => {
  	return {
  		...m, 
  		type: MessageType.CHAT,
  		replies: []
  	}
  	}) as Array<Message>
}


export enum MessageType {
	CHAT,
	IDEA
}