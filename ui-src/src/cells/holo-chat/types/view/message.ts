import {Message as ModelMessage} from '../model/message'

export type Message = any

export function modelMessagesToViewMessages(messages: Array<ModelMessage>): Array<Message> {
  return messages as Array<Message>
}


export enum MessageType {
	CHAT,
	IDEA
}