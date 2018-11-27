
export interface ChannelSpec {
  members: Array<string>,
  name: string,
  description: string
}

export interface Channel {
  hash: string,
  isPublic: boolean,
  name?: string,
  description?: string
}
