function genesis() {
  return true
}

function getDNA(channel){
  var dnaList = getBridges()
  // debug(dnaList)
  var dnaEntry = dnaList.filter(function(dna){
    return dna.CalleeName === channel
  })
  // debug(dnaEntry[0].CalleeApp)
  return dnaEntry[0].CalleeApp
}

function bridgeGenesis(side, dna, appData) {
  debug(App.Name + ' Bridged to: DNA: ' + dna)
  return true
}
