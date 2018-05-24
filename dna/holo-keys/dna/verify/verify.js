'use strict';

function genesis() {
  return true;
}

function bridgeGenesis(side, dna, appData) {
  debug(getBridges())
  debug('HoloKeys ' + App.Name + ' Bridged to: DNA: ' + dna + ' appData: ' + appData)
  return true;
}

function getGenesisPublicKey() {
  return get(App.Key.Hash)
}

function getSignature() {
  debug('RevocationMethod ' + sign('Revocation Method'))
  return sign('Revocation Method')
}

function validateCommit(entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "sampleEntry":
      return true;
    default:
      // invalid entry name
      return false;
  }
}

function validatePut(entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "sampleEntry":
      return true;
    default:
      // invalid entry name
      return false;
  }
}

function validateMod(entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    case "sampleEntry":
      return true;
    default:
      // invalid entry name
      return false;
  }
}

function validateDel(entryName, hash, pkg, sources) {
  switch (entryName) {
    case "sampleEntry":
      return true;
    default:
      // invalid entry name
      return false;
  }
}

function validateLink(linkEntryType, baseHash, links, pkg, sources) {
  return false;
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
