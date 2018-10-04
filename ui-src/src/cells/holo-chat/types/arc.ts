
type Hash = string

export enum ArcType {
	AVAILABLE,
	UNAVAILABLE
}

export interface AvailableArc {
  id: Hash,
  index: number,
  type: ArcType.AVAILABLE
  name: string,
  begin: number
  duration: number,
  x: number,
  y: number,
  radius: number
}

export interface UnavailableArc {
  id: Hash,
  index: number,
  type: ArcType.UNAVAILABLE
  name: string,
  begin: number
  duration: number,
  x: number,
  y: number,
  radius: number
}

export type Arc = AvailableArc | UnavailableArc
