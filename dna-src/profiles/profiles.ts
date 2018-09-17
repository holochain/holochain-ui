'use strict';

export = 0;
let module = {}

import { ProfileSpec, Profile, ProfileField } from '../vault-types/profile'
import { Persona, Field as PersonaField } from '../vault-types/persona'
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


function getProfileSpecs(): Array<ProfileSpec> {
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



function createMapping(payload: {appDNA: holochain.Hash, profileField: string, personaId: string, personaField: string}): number | holochain.HolochainError {
   const {appDNA, profileField, personaId, personaField} = payload
  let mapsCreated = 0
  // Filter only specs that are for the correct dna and have the specified profileField
  getProfileSpecs().filter(spec => spec.sourceDNA === appDNA).forEach(spec => {
    spec.fields.filter(field => field.name === profileField).forEach(specField => {
      const field: ProfileField = {
        ...specField,
        personaId,
        personaFieldName: personaField
      }

      try {
        const fieldHash = commit('field_mapping', field)
        commit('field_mapping_links', { Links: [ { Base: App.Key.Hash, Link: fieldHash, Tag: 'field_mappings' } ] })
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


// TODO: rewrite. This is totally unreadable

function retrieve(payload: {appDNA: string, profileField: string}): any {
  const {appDNA, profileField} = payload

  getProfileSpecs().filter(spec => spec.sourceDNA === appDNA).forEach(spec => {
    spec.fields.filter((field: ProfileField) => field.name === profileField).forEach((field: ProfileField) => {
      JSON.parse(call('personas', 'getPersonas', {})).filter((persona: Persona) => persona.id === field.personaId).forEach((persona: Persona) => {
        persona.fields.forEach((pField: PersonaField) => {
          if(pField.name === field.name) {
            return pField.data
          }
        })
      })
    })
  })
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


