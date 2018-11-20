var fs = require('fs')
var agents = JSON.parse(fs.readFileSync('./contacts.json', 'utf8'))

function makeAvatar(file){
  return 'data:image/png;base64,' + fs.readFileSync('/Users/philipbeadle/holochain/resources/avatars/' + file, 'base64')
}

// var result = agents.map(agent => ({name: agent.name, handle: agent.handle, avatar: makeAvatar(agent.avatar) }))
// console.log(result)
// fs.writeFileSync('./contactsBase64.ts', 'export const agents = ' + JSON.stringify(result).replace(/"/g, '\'').replace(/:'/g, ': \'').replace(/{'/g, '{ \'').replace(/'}/g, '\' }'));

var result = agents.map(agent => ({email: agent.handle + '@holo.host', handle: agent.handle, avatar: '', timezone: 'UTC' }))
console.log(JSON.stringify(result))
console.log('vec![\n' + JSON.stringify(result).replace(/\[{/g, "},\n StoreProfile {").replace(/},{/g, "},\n StoreProfile {").replace(/"},{/g, "},\n StoreProfile {").replace(/"email"/g, "email").replace(/"handle"/g, "handle").replace(/"avatar"/g, "avatar").replace(/"timezone"/g, "timezone").replace(/",/g, "\".to_string(),").replace(/"}/g, "\".to_string()}"))
// fs.writeFileSync('./profiles.rs', JSON.stringify(result).replace(/"},{"/g, "},\n Profile {").replace(/"},{"/g, "},\n Profile {"));


// vec![
//   Profile {
//     name: "Aaron Faulkner",
//     handle: "aaron_faulkner",
//     avatar: "aaron_faulkner.png"
//   },
