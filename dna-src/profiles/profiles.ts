'use strict';

export = 0;
let module = {}

import { ProfileSpec, Profile, ProfileField, ProfileMapping } from '../vault-types/profile'
import { Persona, PersonaField } from '../vault-types/persona'


/*=============================================
=            Public Zome Functions            =
=============================================*/

function registerApp(profileSpec: ProfileSpec): boolean | holochain.HolochainError {
  try {
    const profileHash = commit('profile', profileSpec)
    commit('profile_links', { Links: [ { Base: App.Key.Hash, Link: profileHash, Tag: 'profiles' } ] })
    return true
  } catch(e) {
    debug(e)
    return e
  }
}


function getProfiles(): Array<Profile> {
  try {
    return getLinks(App.Key.Hash, 'profiles', {Load:true}).map((elem) => {
      const profileSpec = elem.Entry as ProfileSpec
      return profileSpec
    })
  } catch(e) {
    debug(e)
    return e
  }
}



function createMapping(payload: ProfileMapping): number | holochain.HolochainError {
   const {appDNA, profileField, personaHash, personaField} = payload
  let mapsCreated = 0
  // Filter only specs that are for the correct dna and have the specified profileField
  getProfileSpecs().filter(spec => spec.sourceDNA === appDNA).forEach(spec => {
    spec.fields.filter(fieldSpec => fieldSpec.name === profileField).forEach(specField => {
      
      const field: ProfileField = {
        ...specField,
        personaId,
        personaFieldName: personaField
      }

      try {
        const fieldHash = commit('field_mapping', field)
        const profileHash = makeHash('profile', spec)
        commit('field_mapping_links', { Links: [ { Base: profileHash, Link: fieldHash, Tag: 'field_mappings' } ] })
        mapsCreated += 1
      } catch (e) {
        debug(e)
      }
    })
  })
  if(mapsCreated < 1) {
    return Error("No fields in specs match the parameters")
  }
  return mapsCreated
}



function getProfileFields(profileHash: holochain.Hash): Array<ProfileField> {
  try {
    return getLinks(profileHash, 'field_mappings', {Load: true}).map(elem => elem.Entry)
  } catch (e) {
    debug(e)
    return e
  }
}

// TODO: rewrite to make more readable
// TODO: add detailed error response. Did it fail validation or was it missing from the persona etc
// called by the hApp not by the user
function retrieve(payload: {retrieverDNA: string, profileField: string}): any {
  const {retrieverDNA, profileField} = payload
  const profiles = getProfileSpecs().filter(spec => spec.sourceDNA === retrieverDNA)
  let result: any

  profiles.forEach(spec => {
    const fields = getProfileFields(makeHash('profile', spec)).filter((field: ProfileField) => field.name === profileField)
    debug(fields)
    fields.forEach((field: ProfileField) => {
      JSON.parse(call('personas', 'getPersonas', {})).filter((persona: Persona) => persona.id === field.personaId).forEach((persona: Persona) => {
        persona.fields.forEach((pField: PersonaField) => {
          if(pField.name === field.personaFieldName) {
            result = pField.data
          }
        })
      })
    })
  })

  // Do json schema checking here
  if(result) {
    return result
  } else {
      return Error("No valid mapping found")
  }

}

// TODO: add the other CRUD methods as needed


/*============================================
=            Validation Callbacks            =
============================================*/

// TODO: add actual validation

function bridgeGenesis(side, dna, appData) {
  return true
}

function genesis () {
  return true;
}

function validateCommit (entryName, entry, header, pkg, sources) {
  return true
}

function validatePut (entryName, entry, header, pkg, sources) {
  return true
}

function validateMod (entryName, entry, header, replaces, pkg, sources) {
  return true
}

function validateDel (entryName, hash, pkg, sources) {
  return true
}

function validateLink (entryName, baseHash, links, pkg, sources) {
  return true
}

function validatePutPkg (entryName) {
  return null;
}

function validateModPkg (entryName) {
  return null;
}

function validateDelPkg (entryName) {
  return null;
}

function validateLinkPkg (entryName) {
  return null;
}


/*=====  End of Validation Callbacks  ======*/


