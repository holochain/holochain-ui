export const MESSAGESLIST = 'messagesList'

export interface Meta {
	isHc: true,
	namespace: string
}

type MessagesList = {type: typeof MESSAGESLIST, meta: Meta, payload?: any}

export function messagesList(): MessagesList {
  return {
    type: MESSAGESLIST,
    meta: {
      isHc: true,
      namespace: 'messages'
    }
  }
}

export type Actions = MessagesList
