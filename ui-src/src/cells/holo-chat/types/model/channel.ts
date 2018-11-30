
export interface ChannelSpec {
  members: Array<string>,
  name: string,
  description: string,
  isPublic: boolean
}

export interface Channel {
  hash: string,
  isPublic: boolean,
  name?: string,
  description?: string
}
