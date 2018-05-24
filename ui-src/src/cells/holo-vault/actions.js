export const PROFILEMAPPINGCREATE = 'profileMappingCreate'
export const PERSONACREATE = 'personaCreate'
export const PERSONAUPDATE = 'personaUpdate'
export const PROFILESLIST = 'profilesList'
export const PERSONASLIST = 'personasList'
export const CELLSLIST = 'cellsList'

export function cellsList() {
  return {
    type: CELLSLIST,
    meta: {
      isHc: true,
      namespace: 'cells'
    }
  }
}

export function profileMappingCreate(profileMapping) {
  return {
    type: PROFILEMAPPINGCREATE,
    meta: {
      isHc: true,
      namespace: 'profiles',
      data: profileMapping
    }
  }
}

export function personaCreate(persona) {
  return {
    type: PERSONACREATE,
    meta: {
      isHc: true,
      namespace: 'personas',
      data: persona
    }
  }
}

export function personaUpdate(persona) {
  return {
    type: PERSONAUPDATE,
    meta: {
      isHc: true,
      namespace: 'personas',
      data: persona
    }
  }
}

export function personasList() {
  return {
    type: PERSONASLIST,
    meta: {
      isHc: true,
      namespace: 'personas'
    }
  }
}

export function profilesList() {
  return {
    type: PROFILESLIST,
    meta: {
      isHc: true,
      namespace: 'profiles'
    }
  }
}
