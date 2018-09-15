
import { JSONSchema6 } from 'json-schema'

export = 0;
let module = {}



/*================================
=            Typedefs            =
================================*/

interface ProfileSpec {
    sourceDNA: string, // the DNA of the hApp requesting data
    fields: Array<FieldSpec>, // array of fields this app requires
}

interface FieldSpec {
    name: string,
    required: boolean,
    description: string, // describes what the app will do with this data
    schema: JSONSchema6 // field must pass this validator to be accepted
}

interface Profile {
    sourceDNA: string,
    mappings: Array<FieldMapping>
}

interface FieldMapping {
    personaId: string, // ID of the persona to retrieve this from
    targetFieldName: string // field to retrieve from this persona
    spec: FieldSpec // specification for the field. Used to revalidate if changed
}

/*=====  End of Typedefs  ======*/


/*=============================================
=            Public Zome Functions            =
=============================================*/

function profileMappingCreate (profileMappingEntry) {
  var profileMappingHash = commit("profileMapping", profileMappingEntry);
  return profileMappingHash;
}

function profileMappingRead (profileMappingHash) {
  var profileMapping = get(profileMappingHash);
  return profileMapping;
}

function profileMappingUpdate (params) {
  var replaces = params.replaces;
  var newEntry = params.newEntry;
  var profileMappingHash = update("profileMapping", newEntry, replaces);
  return profileMappingHash;
}

function profileMappingDelete (profileMappingHash) {
  var result = remove(profileMappingHash, '');
  return result;
}

function profileSpecCreate (profileSpecEntry) {
  var profileSpecHash = commit("profileSpec", profileSpecEntry);
  return profileSpecHash;
}

function profilesList () {
  var personas = query({
    Return: {
      Hashes: true,
      Entries: true
    },
    Constrain: {
      EntryTypes: ["profile"]
    }
  }) as holochain.QueryResponse[]

  var personasWithHash = []
  personas.forEach(function(persona){
    var personaWithHash = {
      "hash": persona.Hash,
      "persona": persona.Entry
    }
    personasWithHash.push(personaWithHash)
  })

  debug(personasWithHash)
  return personasWithHash;
}

/*=====  End of Public Zome Functions  ======*/



// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

/**
 * Called only when your source chain is generated
 * @return {boolean} success
 */
function genesis () {
  return true;
}

function bridgeGenesis(side, dna, appData) {
  debug(App.Name + ' Profiles Bridged to: DNA: ' + dna)
  return true;
}
// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateCommit (entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "profileMapping":
      return true;
    case "profileSpec":
      return true;
    default:
      // invalid entry name
      return false;
  }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validatePut (entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "profileMapping":
      return true;
    case "profileSpec":
      return true;
    default:
      // invalid entry name
      return false;
  }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {string} replaces - the hash for the entry being updated
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateMod (entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    case "profileMapping":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    default:
      // invalid entry name
      return false;
  }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {string} hash - the hash of the entry to remove
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateDel (entryName, hash, pkg, sources) {
  switch (entryName) {
    case "profileMapping":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    default:
      // invalid entry name
      return false;
  }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {string} baseHash - the hash of the base entry being linked
 * @param {?} links - ?
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateLink (entryName, baseHash, links, pkg, sources) {
  switch (entryName) {
    case "profileMapping":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    default:
      // invalid entry name
      return false;
  }
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validatePutPkg (entryName) {
  return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateModPkg (entryName) {
  return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateDelPkg (entryName) {
  return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateLinkPkg (entryName) {
  return null;
}
