export const MESSAGESLIST = 'messagesList'
export const CHANNELSLIST = 'channelsList'


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

type ChannelsList = {type: typeof CHANNELSLIST, meta: Meta, payload?: any}

export function channelsList(): ChannelsList {
  return {
    type: CHANNELSLIST,
    meta: {
      isHc: true,
      namespace: 'channels'
    }
  }
}

export type Actions = MessagesList | ChannelsList
