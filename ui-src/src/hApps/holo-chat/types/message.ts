
type Hash = string

export enum MessageType {
    CHAT,
    IDEA
}

export interface IdeaMessageContent {
  upVotes: number,
  downVotes: number,
  description: string,
  avatar: string,
  productOwner: string,
  title: string
}

export interface ChatMessageContent {
  text: string,
  image?: string
}

export type IdeaMessage
    = {type: MessageType.IDEA, content: IdeaMessageContent}

export type ChatMessage
    = {type: MessageType.CHAT, content: ChatMessageContent}

type MessageUnion
    = IdeaMessage
    | ChatMessage

export type Message
    = MessageUnion & {
      author: Hash,
      timestamp: number,
      content: any,
      replies: Array<Message>,
      channelId: string
    }
