
type Hash = string

export enum ChannelType {
	PUBLIC,
	FILTERED
}

export interface PublicChannel {
  id: Hash,
  type: ChannelType.PUBLIC
  name: string,
  description: string
}

export interface FilteredChannel {
  id: Hash,
  type: ChannelType.FILTERED
  name: string,
  description: string
}

export type Channel = PublicChannel | FilteredChannel
