"use strict";
var module = {};
/*=============================================
=            Public Zome Functions            =
=============================================*/
/**
 * Return the key hash of this agent
 *
 * @return     {holochain.Hash}  Key hash of agent
 */
function whoami() {
    return App.Key.Hash;
}
function getIdentity(keyHash) {
    return getLinks(keyHash, 'identity', { Load: true }).map(function (elem) {
        return elem.Entry;
    })[0];
}
/**
 * Sets the identity.
 *
 * @param      {IdentitySpec}  identity  The identity
 * @return     {boolean}  Returns true if successful in setting identity
 */
function setIdentity(identity) {
    // mark any old identites as deleted
    var currentIdentity = getIdentity(App.Key.Hash);
    if (currentIdentity) {
        update('identity', identity, makeHash('identity', currentIdentity));
    }
    else {
        var idHash = commit('identity', identity);
        commit('identity_links', { Links: [{ Base: App.Key.Hash, Link: idHash, Tag: 'identity' }] });
    }
    return true;
}
/**
 * Gets all the users of this DNA
 *
 * @return     {Array<Identity>}  Array of the identies of all users
 */
function getUsers() {
    return getLinks(App.DNA.Hash, 'directory').map(function (users) {
        debug(users);
        return getLinks(users.Hash, 'identity', { Load: true }).map(function (elem) {
            return elem.Entry;
        })[0];
    });
}
/*=====  End of Public Zome Functions  ======*/
function generateTestData() {
    var identities = [
        { handle: 'Willem', avatar: '' },
        { handle: 'Philip', avatar: '' },
        { handle: 'Jean', avatar: '' },
        { handle: 'Micah', avatar: '' },
        { handle: 'Celestial', avatar: '' }
    ].forEach(function (identity) {
        var idHash = commit('identity', identity);
        var keyHash = commit('fake_hash', identity.handle);
        commit('identity_links', { Links: [{ Base: App.DNA.Hash, Link: keyHash, Tag: 'directory' }] });
        commit('identity_links', { Links: [{ Base: keyHash, Link: idHash, Tag: 'identity' }] });
    });
}
function genesis() {
    generateTestData();
    setIdentity({ handle: App.Agent.String, avatar: '' });
    commit('identity_links', { Links: [{ Base: App.DNA.Hash, Link: App.Key.Hash, Tag: 'directory' }] });
    return true;
}
function bridgeGenesis(side, dna, appData) {
    return true;
}
function validateCommit(entryName, entry, header, pkg, sources) {
    return validate(entryName, entry, header, pkg, sources);
}
function validate(entryName, entry, header, pkg, sources) {
    return true;
}
function validatePut(entryName, entry, header, pkg, sources) {
    return validate(entryName, entry, header, pkg, sources);
}
function validateMod(entryName, entry, header, replaces, pkg, sources) {
    return true;
}
function validateDel(entryName, hash, pkg, sources) {
    return true;
}
function validateLink(entryName, baseHash, links, pkg, sources) {
    return true;
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
module.exports = 0;
