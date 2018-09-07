
export interface ChannelSpec {
	members: Array<string>,
	name: string,
	description: string
}

export interface Channel {
	id: string,
	name?: string,
	description?: string
}

