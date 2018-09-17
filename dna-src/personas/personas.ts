'use strict';

export = 0;
let module = {}

import { Persona, PersonaSpec, Field } from '../vault-types/persona'

/*=============================================
=            Public Zome Functions            =
=============================================*/

function createPersona(spec: PersonaSpec): holochain.Hash | holochain.HolochainError {
  try {
    const personaHash = commit('persona', spec)
    commit('persona_links', { Links: [ { Base: App.Key.Hash, Link: personaHash, Tag: 'personas' } ] })
    return personaHash
  } catch(e) {
    debug(e)
    return e
  }
}

function getPersonas(): Array<Persona> | holochain.HolochainError {
  try {
    return getLinks(App.Key.Hash, 'personas', {Load:true}).map((elem) => {
      const persona = elem.Entry
      const fields = getLinks(elem.Hash, 'fields', {Load: true}).map(field => field.Entry)
      return {
        ...persona,
        fields,
        hash: elem.Hash
      }
    })
  } catch(e) {
    debug(e)
    return e
  }
}

function addField(payload: {personaHash: string, field: Field}): boolean {
  const {personaHash, field} = payload
  try {
    const fieldHash = commit('field', field)
    commit('field_links', { Links: [ { Base: personaHash, Link: fieldHash, Tag: 'fields' } ] })
    return true
  } catch(e) {
    debug(e)
    return e
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


