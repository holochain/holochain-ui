'use strict';

function genesis() {
  return true;
}

function bridgeGenesis(side, dna, appData){
  debug('Channel ' + App.Name + ' Bridged to: DNA: ' + dna + ' appData: ' + appData)
  return true;
}

function getDNA(channel){
  debug('getDNA ' + channel.channel)
  var dnaList = getBridges()
  debug(dnaList)
  var dnaEntry = dnaList.filter(function(dna){
    return dna.CalleeName === channel.channel
  })
  debug(dnaEntry[0].CalleeApp)
  return dnaEntry[0].CalleeApp
}

function validateCommit (entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "channel":
      return true
    default:
      // invalid entry name
      return false;
  }
}

function validatePut (entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "channel":
      return true
    default:
      // invalid entry name
      return false;
  }
}

function validateMod (entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    case "channel":
      return true;
    default:
      // invalid entry name
      return false;
  }
}

function validateDel (entryName, hash, pkg, sources) {
  switch (entryName) {
    case "channel":
      return true;
    default:
      // invalid entry name
      return false;
  }
}

function validateLink(linkEntryType,baseHash,links,pkg,sources) {
  return false;
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
