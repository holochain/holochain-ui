// This test file uses the tape testing framework. 
// To learn more, go here: https://github.com/substack/tape
const test = require('tape');
const Container = require('@holochain/holochain-nodejs')
// instantiate an app from the DNA JSON bundle
const app = Container.loadAndInstantiate("dist/bundle.json")

// activate the new instance
app.start()

const testPersonaSpec = {spec: {name: "something"}}

const testField = (persona_address) => { return {persona_address, field: {name: "test_field", data: "string data"}} }

test('create_persona', t => {

  // Make a call to a Zome function
  // indicating the capability and function, and passing it an input
  const result = app.call("personas", "main", "create_persona", testPersonaSpec)

  // check for equality of the actual and expected results
  console.log(result)
  t.equal(result.Ok.length, 46)

  t.end()
})


test('get_personas', t => {

  app.call("personas", "main", "create_persona", testPersonaSpec)

  const result = app.call("personas", "main", "get_personas", {})
  console.log(result)
  t.equal(result.Ok.length, 1)
  t.end()
})

test('add_field', t => {
  // create a new persona to add field to
  const create_result = app.call("personas", "main", "create_persona", testPersonaSpec)
  const persona_address = create_result.Ok
  t.equal(persona_address.length, 46)

  // add the field
  const add_result = app.call("personas", "main", "add_field", testField(persona_address))
  t.notEqual(add_result.Ok, undefined)

  // can get the field
  const get_result = app.call("personas", "main", "get_personas", {})
  console.log(get_result)
  t.equal(get_result.Ok.filter(p => p.entry.name === "something")[0].entry.fields.length, 1)

  t.end()
})



// ----------  Profiles  ---------- //

const testFieldSpec = {
  name: "testField",
  displayName: "Test Field",
  required: true,
  description: "",
  usage: "STORE",
  schema: ""
}

const testProfileSpec = {
  name: "something", 
  sourceDNA: "xxx", 
  fields: [testFieldSpec]
}


test('register_app', t => {
  const register_result = app.call("profiles", "main", "register_app", {spec: testProfileSpec})
  t.notEqual(register_result.Ok, undefined)
  t.end()
})



test('get_profiles', t => {
  const register_result = app.call("profiles", "main", "register_app", {spec: testProfileSpec})
  t.notEqual(register_result.Ok, undefined)
  const get_result = app.call("profiles", "main", "get_profiles", {})
  console.log(get_result)
  t.deepEqual(get_result.Ok.length, 1)
  t.end()
})



test('create_mapping', t => {
  const register_result = app.call("profiles", "main", "register_app", {spec: testProfileSpec})
  t.notEqual(register_result.Ok, undefined)

  // can call the function with garbage data
  const map_result1 = app.call("profiles", "main", "create_mapping", 
    {
      mapping: {
        retrieverDNA: "xxx", 
        profileFieldName: "xxx", 
        personaAddress: "xxx",
        personaFieldName: "dd"
      }
    })
  console.log(map_result1)
  // should not map any fields
  t.deepEqual(map_result1.Ok, { mappings_created: 0 }, "should not create a mapping as there are no matching fields");

  // create a persona to map to and add a field
  const result = app.call("personas", "main", "create_persona", {spec: {name: "mapToPersona"}})
  const personaAddress = result.Ok
  const add_result = app.call("personas", "main", "add_field", {persona_address: personaAddress, field: {name: "test_field", data: "string data"}})


  // can call the function to create a mapping
  const map_result2 = app.call("profiles", "main", "create_mapping", 
  	{
      mapping: {
        retrieverDNA: "xxx", 
        profileFieldName: "testField", 
        personaAddress: personaAddress,
        personaFieldName: "test_field"
      }
  	})
  console.log(map_result2)
  // should map a single field
  t.deepEqual(map_result2.Ok, { mappings_created: 1 }, "a single mapping should be created");

  // can then see the field is mapped
  const get_result = app.call("profiles", "main", "get_profiles", {})
  console.log(get_result)
  t.deepEqual(get_result.Ok.filter(p => p.name === "something")[0].fields[0].mapping, {personaAddress: personaAddress, personaFieldName: 'test_field'})

  t.end()
})
