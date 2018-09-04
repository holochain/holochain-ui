
type Hash = string

export enum ArcType {
	AVAILABLE,
	UNAVAILABLE
}

export interface AvailableArc {
	id: Hash,
	type: ArcType.AVAILABLE
	name: string,
	begin: number
	duration: number
}

export interface UnavailableArc {
	id: Hash,
	type: ArcType.UNAVAILABLE
	name: string,
	begin: number
	duration: number
}

export type Arc = AvailableArc | UnavailableArc
