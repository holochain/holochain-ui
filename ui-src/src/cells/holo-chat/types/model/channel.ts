
export interface Member {
  agentId: string,
  handle: string,
  email: string,
  avatar: string
}

export interface ChannelSpec {
  initial_members: Array<string>,
  name: string,
  description: string,
  public: boolean
}

export interface Channel {
  address: string,
  public: boolean,
  name: string,
  description?: string
}
