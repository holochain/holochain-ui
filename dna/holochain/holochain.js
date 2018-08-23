'use strict';

function genesis() {
  return true
}

function callBridgedFunction(bridgeCall){
  debug(bridgeCall)
  var channelDNA = getDNA(bridgeCall.channel).replace(/"/g, '')
  debug('channelDNA ' + channelDNA)
  debug('function ' + bridgeCall.function)
  debug('zome ' + bridgeCall.zome)
  debug('data ' + bridgeCall.data)
  if(bridgeCall.data === undefined){
    bridgeCall.data = {}
  }
  var result = bridge(channelDNA, bridgeCall.zome, bridgeCall.function, bridgeCall.data)
  debug('called ' + bridgeCall.function)
  debug(result)
  return JSON.parse(result)
}

function getDNA(channel){
  debug('getDNA ' + channel)
  var dnaList = getBridges()
  debug(dnaList)
  var dnaEntry = dnaList.filter(function(dna){
    debug(dna.CalleeName)
    return dna.CalleeName === channel
  })
  debug(dnaEntry)
  debug('CalleeApp' + dnaEntry[0].CalleeApp)
  return dnaEntry[0].CalleeApp
}
