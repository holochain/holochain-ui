"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
function setIdentity(identitySpec) {
    // mark any old identites as deleted
    var newIdentity = __assign({}, identitySpec, { hash: App.Key.Hash });
    var currentIdentity = getIdentity(App.Key.Hash);
    if (currentIdentity) {
        console.log('replacing identity with ' + JSON.stringify(newIdentity));
        var response = update('identity', newIdentity, makeHash('identity', currentIdentity));
        console.log(response);
    }
    else {
        var idHash = commit('identity', newIdentity);
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
        return getIdentity(users.Hash);
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
    // generateTestData()
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
