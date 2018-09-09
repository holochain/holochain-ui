import {Identity, IdentitySpec} from '../types/identity'

export = 0;
let module = {}


/*=============================================
=            Public Zome Functions            =
=============================================*/

function whoami(): holochain.Hash {
  return App.Key.Hash;
}

function getIdentity(keyHash: holochain.Hash): Identity {
  return getLinks(keyHash, 'identity', {Load: true}).map((elem) => {
    return elem.Entry;
  })[0]
}

function setIdentity(identity: IdentitySpec): boolean {
  // mark any old identites as deleted
  const currentIdentity = getIdentity(App.Key.Hash)
  if(currentIdentity) {
    update('identity', identity, makeHash('identity', currentIdentity))
  } else {
    const idHash = commit('identity', identity);
    commit('identity_links', { Links: [ { Base: App.Key.Hash, Link: idHash, Tag: 'identity' } ] })
  }
  
  return true;
}

function getUsers(): Array<Identity> {
  return getLinks(App.DNA.Hash, 'directory').map((users) => {
    return getLinks(users.Hash, 'identity', {Load: true}).map((elem) => {
      return elem.Entry
    })[0]
  })
}


/*=====  End of Public Zome Functions  ======*/

function genesis() {
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