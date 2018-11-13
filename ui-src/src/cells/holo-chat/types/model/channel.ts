
export interface ChannelSpec {
  members: Array<string>,
  name: string,
  description: string
}

export interface Channel {
  hash: string,
  name?: string,
  description?: string
}
