
export interface Member {
  agentId: string,
  handle: string,
  email: string,
  avatar: string
}

export interface StreamSpec {
  initial_members: Array<String>,
  name: string,
  description: string,
  public: boolean
}

export interface Stream {
  address: string,
  public: boolean,
  name: string,
  description?: string
}
