// This test file uses the tape testing framework.
// To learn more, go here: https://github.com/substack/tape
const test = require('tape')
const Container = require('@holochain/holochain-nodejs-bleeding')

// instantiate an app from the DNA JSON bundle
const app = Container.loadAndInstantiate("dist/bundle.json")

// activate the new instance
app.start()

test('Save event', (t) => {
  const result = app.call("calendar", "main", "save_event", { since: "blah", until: "blah" })
  console.log('R1: ', result)
  t.equal(!!result, true)
  t.end()
})

// test('Retrieve event', (t) => {
//   const result = app.call("calendar", "main", "get_events", {})
//   t.deepEqual(result,[{
//   		since:"2018-12-06T13:30:00-04:00",
//   		until:"2018-12-06T14:30:00-04:00"
//   	}])
//   t.end()
// })
