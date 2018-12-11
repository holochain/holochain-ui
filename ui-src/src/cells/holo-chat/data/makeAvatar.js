var fs = require('fs')
console.log('data:image/png;base64,' + fs.readFileSync('/Users/philipbeadle/holochain/resources/avatars/philipbeadle.png', 'base64'))
