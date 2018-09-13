function genesis() {
    return true;
}
function getDNA(channel) {
    var dnaList = getBridges();
    // debug(dnaList)
    var dnaEntry = dnaList.filter(function (dna) {
        return dna.CalleeName === channel;
    });
    // debug(dnaEntry[0].CalleeApp)
    return dnaEntry[0].CalleeApp;
}
function bridgeGenesis(side, dna, appData) {
    debug(App.Name + ' Bridged to: DNA: ' + dna);
    var KeyMgtAppDNA = getDNA('holo-keys');
    //var Agent = JSON.parse(App.Agent.String.replace(/'/g, '"').slice(0, App.Agent.String.indexOf('}') + 1))
    var genesisPublicKey = bridge(KeyMgtAppDNA, 'verify', 'getGenesisPublicKey', '');
    var signature = bridge(KeyMgtAppDNA, 'verify', 'getSignature', '');
    return verifySignature(signature, 'Revocation Method', genesisPublicKey);
}
