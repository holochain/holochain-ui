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

      // merge the fields and include a mapping where one has been created
      const mappedFields = getProfileFields(elem.Hash)
      const fields: Array<ProfileField> = profileSpec.fields.map((specField) => {
        for(let i=0; i<mappedFields.length; ++i) {
          if(mappedFields[i].name === specField.name) {
            return mappedFields[i]
          }
        }
        return specField;
      });

      return {
        ...profileSpec,
        hash: elem.Hash,
        fields,
        expiry: 0
      }
    })
  } catch(e) {
    debug(e)
    return e
  }
}



function createMapping(payload: ProfileMapping): number | holochain.HolochainError {
   const {retrieverDNA, profileFieldName, personaHash, personaFieldName} = payload
  let mapsCreated = 0
  // Filter only specs that are for the correct dna and have the specified profileField
  getProfiles().filter(profile => profile.sourceDNA === retrieverDNA).forEach(profile => {
    profile.fields.filter(fieldSpec => fieldSpec.name === profileFieldName).forEach(specField => {

      const field: ProfileField = {
        ...specField,
        mapping: {personaHash, personaFieldName}
      }

      try {
        const fieldHash = commit('field_mapping', field)
        commit('field_mapping_links', { Links: [ { Base: profile.hash, Link: fieldHash, Tag: 'field_mappings' } ] })
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


// called by the hApp not by the user
function retrieve(payload: {retrieverDNA: string, profileField: string}): any {
  const {retrieverDNA, profileField} = payload
  const profiles = getProfiles().filter(spec => spec.sourceDNA === retrieverDNA)
  let result: any

  profiles.forEach(profile => {
    const fields = profile.fields.filter((field: ProfileField) => field.name === profileField)
    fields.forEach((field: ProfileField) => {
      JSON.parse(call('personas', 'getPersonas', {}))
        .filter((persona: Persona) => {
          debug(field.mapping.personaHash)
          debug(persona.hash) 
          return persona.hash === field.mapping.personaHash})
        .forEach((persona: Persona) => {
          persona.fields.forEach((pField: PersonaField) => {
            if(pField.name === field.mapping.personaFieldName) {
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


