import {Identity, IdentitySpec} from '../types/identity'

export = 0;
let module = {}


/*=============================================
=            Public Zome Functions            =
=============================================*/

/**
 * Return the key hash of this agent
 *
 * @return     {holochain.Hash}  Key hash of agent
 */
function whoami(): holochain.Hash {
  return App.Key.Hash;
}

function getIdentity(keyHash: holochain.Hash): Identity {
  return getLinks(keyHash, 'identity', {Load: true}).map((elem) => {
    return elem.Entry;
  })[0]
}


/**
 * Sets the identity.
 *
 * @param      {IdentitySpec}  identity  The identity
 * @return     {boolean}  Returns true if successful in setting identity
 */
function setIdentity(identitySpec: IdentitySpec): boolean {
  // mark any old identites as deleted
  const newIdentity = {...identitySpec, hash: App.Key.Hash}
  const currentIdentity = getIdentity(App.Key.Hash)
  if(currentIdentity) {
    console.log('replacing identity with '+JSON.stringify(newIdentity))
    const response = update('identity', newIdentity, makeHash('identity', currentIdentity))
    console.log(response)
  } else {
    const idHash = commit('identity', newIdentity);
    commit('identity_links', { Links: [ { Base: App.Key.Hash, Link: idHash, Tag: 'identity' } ] })
  }
  return true;
}


/**
 * Gets all the users of this DNA
 *
 * @return     {Array<Identity>}  Array of the identies of all users
 */
function getUsers(): Array<Identity> {
  return getLinks(App.DNA.Hash, 'directory').map((users) => {
    return getIdentity(users.Hash)
  })
}


/*=====  End of Public Zome Functions  ======*/


function generateTestData() {
  const identities = [
    {handle: 'Willem', avatar: ''},
    {handle: 'Philip', avatar: ''},
    {handle: 'Jean', avatar: ''},
    {handle: 'Micah', avatar: ''},
    {handle: 'Celestial', avatar: ''}
  ].forEach((identity) => {
    const idHash = commit('identity', identity)
    const keyHash = commit('fake_hash', identity.handle)
    commit('identity_links', { Links: [ { Base: App.DNA.Hash, Link: keyHash, Tag: 'directory' } ] })
    commit('identity_links', { Links: [ { Base: keyHash, Link: idHash, Tag: 'identity' } ] })
  })
}

function genesis() {
  // generateTestData()
  setIdentity({handle: App.Agent.String, avatar: ''});
  commit('identity_links', { Links: [ { Base: App.DNA.Hash, Link: App.Key.Hash, Tag: 'directory' } ] })
  return true;
}


function bridgeGenesis(side, dna, appData) {
  return true;
}


function validateCommit(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return validate(entryName, entry, header, pkg, sources);
}

function validate(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return true
}

function validatePut(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return validate(entryName, entry, header, pkg, sources);
}

function validateMod(entryName: any, entry: any, header: any, replaces: any, pkg: any, sources: any): boolean {
  return true
}

function validateDel(entryName: any, hash: any, pkg: any, sources: any): boolean {
  return true;
}

function validateLink(entryName: any, baseHash: any, links: any, pkg: any, sources: any): boolean {
  return true
}

function validatePutPkg(entryName) {
  return null;
}

function validateModPkg(entryName) {
  return null;
}

function validateDelPkg(entryName) {
  return null;
}

function validateLinkPkg(entryName) {
  return null;
}