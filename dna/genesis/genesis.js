function genesis() {
  return true
}

function bridgeGenesis(side, dna, appData) {
  debug('holochain')
  var Agent = JSON.parse(App.Agent.String.replace(/'/g, '"').slice(0, App.Agent.String.indexOf('}') + 1))
  var genesisPublicKey = bridge(Agent.KeyMgtAppDNA, 'verify', 'getGenesisPublicKey', '')
  var signature = bridge(Agent.KeyMgtAppDNA, 'verify', 'getSignature', '')
  return verifySignature(signature, 'Revocation Method', genesisPublicKey)
}
