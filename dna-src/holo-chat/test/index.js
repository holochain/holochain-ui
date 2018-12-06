// This test file uses the tape testing framework.
// To learn more, go here: https://github.com/substack/tape
const test = require('tape');
const Container = require('@holochain/holochain-nodejs')

// instantiate an app from the DNA JSON bundle
const app = Container.loadAndInstantiate("dist/bundle.json")

// activate the new instance
app.start()

const testNewChannelParams = {
  name: "test new channel",
  description: "for testing...",
  initial_members: [],
  public: true
}

const testMessage = {
  message_type: "text",
  payload: "I am the message payload",
  meta: "{}",
}

test('Can create a public channel with no other members and retrieve it', (t) => {
  const init_result = app.call('chat', 'main', 'init', {})
  console.log(init_result)
  t.equal(init_result.success, true, 'init should return success')

  const create_result = app.call('chat', 'main', 'create_channel', testNewChannelParams)
  console.log(create_result)
  t.deepEqual(create_result.address.length, 46)

  const get_result = app.call('chat', 'main', 'get_my_channels', {})
  console.log(get_result)
  t.deepEqual(get_result.length, 1)

  t.end()
})

test('Can retrieve all the members that are added by init', t => {
  const init_result = app.call('chat', 'main', 'init', {})
  console.log(init_result)
  t.equal(init_result.success, true, 'init should return success')

  const getAllMembersResult = app.call('chat', 'main', 'get_all_members', {})
  console.log(getAllMembersResult)
  t.equal(getAllMembersResult.length, 5) // will fail if we change test data

  t.end()
})

test('Can post a message to the channel and retrieve', (t) => {
  const init_result = app.call('chat', 'main', 'init', {})

  const create_result = app.call('chat', 'main', 'create_channel', testNewChannelParams)
  console.log(create_result)
  const channel_addr = create_result.address
  t.deepEqual(channel_addr.length, 46)

  const get_result = app.call('chat', 'main', 'get_my_channels', {})
  console.log(get_result)
  t.deepEqual(get_result.length, 1)

  const post_result = app.call('chat', 'main', 'post_message', {channel_address: channel_addr, message: testMessage, subjects: []})
  console.log(post_result)
  t.deepEqual(post_result, {success: true})

  const get_message_result = app.call('chat', 'main', 'get_messages', {address: channel_addr})
  console.log(get_message_result)
  const messages = get_message_result
  t.deepEqual(messages[0].payload, testMessage.payload, 'expected to receive the message back')
  t.end()
})


test('Can post a message with a subject and this is added to the channel', t => {
  const init_result = app.call('chat', 'main', 'init', {})

  const create_result = app.call('chat', 'main', 'create_channel', testNewChannelParams)
  console.log(create_result)
  const channel_addr = create_result.address
  t.deepEqual(channel_addr.length, 46)

  const post_result = app.call('chat', 'main', 'post_message', {channel_address: channel_addr, message: testMessage, subjects: ['memes']})
  console.log(post_result)
  t.deepEqual(post_result, {success: true})

  const get_subjects_result = app.call('chat', 'main', 'get_subjects', {channel_address: channel_addr})
  console.log(get_subjects_result)
  t.deepEqual(get_subjects_result[0].entry.name, 'memes')
  t.deepEqual(get_subjects_result[0].entry.channel_address.length, 46)
  t.deepEqual(get_subjects_result[0].address.length, 46)


  t.end()
})

test('Can create a public channel with some members', (t) => {
  const init_result = app.call('chat', 'main', 'init', {})

  const create_result = app.call('chat', 'main', 'create_channel', {...testNewChannelParams, public: false, initial_members: [{id: "wollum"}, {id: "philipbeadle"}]})
  console.log(create_result)
  t.deepEqual(create_result.address.length, 46)
  t.end()
})



/*----------  Vault  ----------*/

test('create_persona and retrieve', t => {

  // Make a call to a Zome function
  // indicating the capability and function, and passing it an input
  const result = app.call("personas", "main", "create_persona", {spec: {name: "something"}})
  console.log(result)
  t.equal(result.address.length, 46)

  const get_result = app.call("personas", "main", "get_personas", {})
  console.log(get_result)
  t.equal(get_result.personas.length, 1)

  t.end()
})


test('add_field', t => {
  // create a new persona to add field to
  const create_result = app.call("personas", "main", "create_persona", {spec: {name: "something"}})
  const persona_address = create_result.address
  t.equal(persona_address.length, 46)

  // add the field
  const add_result = app.call("personas", "main", "add_field", {persona_address: persona_address, field: {name: "test_field", data: "string data"}})
  console.log(add_result)
  t.deepEqual(add_result, {success: true})

  // can get the field
  const get_result = app.call("personas", "main", "get_personas", {})
  console.log(get_result)
  t.equal(get_result.personas.filter(p => p.name === "something")[0].fields.length, 1)

  t.end()
})

test('delete_field', t => {
  // create a new persona to add field to
  const create_result = app.call("personas", "main", "create_persona", {spec: {name: "something"}})
  const persona_address = create_result.address
  t.deepEqual(persona_address.length, 46)

  // add the field
  const add_result = app.call("personas", "main", "add_field", {persona_address: persona_address, field: {name: "test_field", data: "string data"}})
  t.deepEqual(add_result, {success: true})

  // delete the field
  const delete_result = app.call("personas", "main", "delete_field", {persona_address: persona_address, field_name: "test_field"})
  t.deepEqual(delete_result, {fields_deleted: 1})

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


// test('register_app', t => {
//   const register_result = app.call("profiles", "main", "register_app", {spec: testProfileSpec})
//   t.deepEqual(register_result, {success: true})
//   t.end()
// })

test('get_profiles', t => {
  const register_result = app.call("profiles", "main", "register_app", {spec: testProfileSpec})
  t.deepEqual(register_result, {success: true})
  const get_result = app.call("profiles", "main", "get_profiles", {})
  console.log(get_result)
  t.deepEqual(get_result.profiles.length, 1) // including the auto populated specs
  t.end()
})

test('create_mapping', t => {
  const register_result = app.call("profiles", "main", "register_app", {spec: testProfileSpec})
  t.deepEqual(register_result, {success: true})

  // // can call the function with garbage data
  // const map_result1 = app.call("profiles", "main", "create_mapping", 
  //   {
  //     mapping: {
  //       retrieverDNA: "xxx", 
  //       profileFieldName: "xxx", 
  //       personaAddress: "xxx",
  //       personaFieldName: "dd"
  //     }
  //   })
  // // should not map any fields
  // t.deepEqual(map_result1, { maps_created: 0 }, "should not create a mapping as there are no matching fields");

  // create a persona to map to and add a field
  const result = app.call("personas", "main", "create_persona", {spec: {name: "mapToPersona"}})
  const personaAddress = result.address
  console.log(personaAddress)
  const add_result = app.call("personas", "main", "add_field", {persona_address: personaAddress, field: {name: "test_field", data: "string data"}})
  console.log(add_result)

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
  // should map a single field
  t.deepEqual(map_result2, { maps_created: 1 }, "A single mapping should have been created");

  // can then see the field is mapped
  const get_result = app.call("profiles", "main", "get_profiles", {})
  console.log(get_result)
  t.deepEqual(get_result.profiles.filter(p => p.name === "something")[0].fields[0].mapping, {personaAddress: personaAddress, personaFieldName: 'test_field'})

  t.end()
})

