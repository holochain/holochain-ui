
export interface Member {
  id: string
}

export interface StreamSpec {
  initial_members: Array<Member>,
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
