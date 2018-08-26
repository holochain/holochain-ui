
export interface Profile {
	name: string,
	profileSpec: ProfileSpec,
	src: string
}

type ProfileSpec = any //TODO: rewrite as an inteface