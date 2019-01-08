
type Hash = string

export enum StreamType {
	PUBLIC,
	FILTERED
}

export interface PublicStream {
  id: Hash,
  type: StreamType.PUBLIC
  name: string,
  description: string
}

export interface FilteredStream {
  id: Hash,
  type: StreamType.FILTERED
  name: string,
  description: string
}

export type Stream = PublicStream | FilteredStream
