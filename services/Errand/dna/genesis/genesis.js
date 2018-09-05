'use strict';

function genesis() {
  return true
}
//
function bridgeGenesis(side, dna, appData) {
  // debug('errand genesis')
  // debug(getBridges())
  // debug(App.Agent.String + ' HoloChat ' + App.Name + ' Bridged to: DNA: ' + dna + ' appData: ' + appData)
  var Agent = JSON.parse(App.Agent.String.replace(/'/g, '"').slice(0, App.Agent.String.indexOf('}') + 1))
  // debug(Agent.KeyMgtAppDNA)
  var genesisPublicKey = bridge(Agent.KeyMgtAppDNA, 'verify', 'getGenesisPublicKey', '')
  // debug(genesisPublicKey)
  var signature = bridge(Agent.KeyMgtAppDNA, 'verify', 'getSignature', '')
  return verifySignature(signature, 'Revocation Method', genesisPublicKey)
}
