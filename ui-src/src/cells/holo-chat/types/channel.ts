
type Hash = string

export enum ChannelType {
	PUBLIC
}

export interface PublicChannel {
	id: Hash,
	name: string,
	description: string
}

export type Channel = ChannelType | PublicChannel
