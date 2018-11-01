// This test file uses the tape testing framework. 
// To learn more, go here: https://github.com/substack/tape
const test = require('tape');

// instantiate an app from the DNA JSON bundle
const app = Container.loadAndInstantiate("dist/bundle.json")

// activate the new instance
app.start()

test('create_persona', t => {

  // Make a call to a Zome function
  // indicating the capability and function, and passing it an input
  const result = app.call("personas", "main", "create_persona", JSON.stringify({spec: {name: "something"}}))

  // check for equality of the actual and expected results
  console.log(result)
  t.equal(JSON.parse(result).address.length, 46)

  t.end()
})


test('get_personas', t => {

  app.call("personas", "main", "create_persona", JSON.stringify({spec: {name: "d"}}))

  const result = app.call("personas", "main", "get_personas", JSON.stringify({}))
  // t.equal(JSON.parse(result).persona_addresses.length, 1) // not working because of persisting entries

  // add another pesona and see if it can be retrieved

  console.log(result)
  t.end()
})

test('add_field', t => {
  // create a new persona to add field to
  const create_result = app.call("personas", "main", "create_persona", JSON.stringify({spec: {name: "something"}}))
  const persona_address = JSON.parse(create_result).address
  t.equal(persona_address.length, 46)

  // add the field
  const add_result = app.call("personas", "main", "add_field", JSON.stringify({persona_address: persona_address, field: {name: "test_field", data: "string data"}}))
  t.equal(JSON.parse(add_result), true)

  // can get the field
  const get_result = app.call("personas", "main", "get_personas", JSON.stringify({}))
  t.equal(JSON.parse(get_result).personas.filter(p => p.name === "something")[0].fields.length, 1)

  t.end()
})

test('delete_field', t => {
  // create a new persona to add field to
  const create_result = app.call("personas", "main", "create_persona", JSON.stringify({spec: {name: "something"}}))
  const persona_address = JSON.parse(create_result).address
  t.equal(persona_address.length, 46)

  // add the field
  const add_result = app.call("personas", "main", "add_field", JSON.stringify({persona_address: persona_address, field: {name: "test_field", data: "string data"}}))
  t.equal(JSON.parse(add_result), true)

  // delete the field
  const delete_result = app.call("personas", "main", "delete_field", JSON.stringify({persona_address: persona_address, field_name: "test_field"}))
  t.equal(JSON.parse(delete_result), 1)

  t.end()
})
