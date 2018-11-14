var fs = require('fs')
var agents = JSON.parse(fs.readFileSync('./contacts.json', 'utf8'))

function makeAvatar(file){
  return 'data:image/png;base64,' + fs.readFileSync('/Users/philipbeadle/holochain/resources/avatars/' + file, 'base64')
}

var result = agents.map(agent => ({name: agent.name, handle: agent.handle, avatar: makeAvatar(agent.avatar) }))
console.log(result)
fs.writeFileSync('./contactsBase64.ts', 'export const agents = ' + JSON.stringify(result).replace(/"/g, '\'').replace(/:'/g, ': \'').replace(/{'/g, '{ \'').replace(/'}/g, '\' }'));
