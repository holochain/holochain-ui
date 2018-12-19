// This test file uses the tape testing framework.
// To learn more, go here: https://github.com/substack/tape
const test = require('tape');
const Container = require('@holochain/holochain-nodejs-bleeding')

// instantiate an app from the DNA JSON bundle
const app = Container.loadAndInstantiate("dist/bundle.json")

// activate the new instance
app.start()

/*----------  Chat  ----------*/


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

// test('Can create a public channel with no other members and retrieve it', (t) => {
//   const init_result = app.call('chat', 'main', 'init', {})
//   console.log(init_result)
//   t.notEqual(init_result.Ok, undefined, 'init should return success')

//   const get_all_members_result = app.call('chat', 'main', 'get_all_members', {})
//   console.log('all members:', get_all_members_result)
//   let allMembers = get_all_members_result.Ok
//   t.true(allMembers.length > 0, 'gets at least one member')

//   const create_result = app.call('chat', 'main', 'create_channel', testNewChannelParams)
//   console.log(create_result)
//   t.deepEqual(create_result.Ok.length, 46)

//   const get_result = app.call('chat', 'main', 'get_my_channels', {})
//   console.log(get_result)
//   t.deepEqual(get_result.Ok.length, 1)

//   t.end()
// })

// test('Can retrieve all the members that are added by init', t => {
//   const init_result = app.call('chat', 'main', 'init', {})
//   console.log(init_result)
//   t.notEqual(init_result.Ok, undefined, 'init should return success')

//   const getAllMembersResult = app.call('chat', 'main', 'get_all_members', {})
//   console.log(getAllMembersResult.Ok)
//   t.equal(getAllMembersResult.Ok.length, 1) // will fail if we change test data
//   t.end()
// })

// test('Can post a message to the channel and retrieve', (t) => {
//   const init_result = app.call('chat', 'main', 'init', {})
//   console.log(init_result)
//   t.notEqual(init_result.Ok, undefined, 'init should return success')

//   const create_result = app.call('chat', 'main', 'create_channel', testNewChannelParams)
//   console.log(create_result)
//   const channel_addr = create_result.Ok
//   t.deepEqual(channel_addr.length, 46)

//   const get_result = app.call('chat', 'main', 'get_my_channels', {})
//   console.log(get_result)
//   t.deepEqual(get_result.Ok.length, 1)

//   const post_result = app.call('chat', 'main', 'post_message', {channel_address: channel_addr, message: testMessage, subjects: []})
//   console.log(post_result)
//   t.notEqual(post_result.Ok, undefined, 'post should return Ok')

//   const get_message_result = app.call('chat', 'main', 'get_messages', {address: channel_addr})
//   console.log(get_message_result)
//   t.deepEqual(get_message_result.Ok[0].entry.payload, testMessage.payload, 'expected to receive the message back')
//   t.end()
// })


// test('Can post a message with a subject and this is added to the channel', t => {
//   const init_result = app.call('chat', 'main', 'init', {})
//   console.log(init_result)
//   t.notEqual(init_result.Ok, undefined, 'init should return success')

//   const create_result = app.call('chat', 'main', 'create_channel', testNewChannelParams)
//   console.log(create_result)
//   const channel_addr = create_result.Ok
//   t.deepEqual(channel_addr.length, 46)

//   const post_result = app.call('chat', 'main', 'post_message', {channel_address: channel_addr, message: testMessage, subjects: ['subject 1', 'subject 2']})
//   console.log(post_result)
//   t.notEqual(post_result.Ok, undefined, 'post should return success')

//   const get_subjects_result = app.call('chat', 'main', 'get_subjects', {channel_address: channel_addr})
//   console.log(get_subjects_result)
//   t.deepEqual(get_subjects_result.Ok.length, 2)
//   t.deepEqual(get_subjects_result.Ok[0].entry.channel_address.length, 46)
//   t.deepEqual(get_subjects_result.Ok[0].address.length, 46)

//   const get_subject_message_result = app.call('chat', 'main', 'get_messages', {address: get_subjects_result.Ok[0].address})
//   console.log('Messages linked to the subject' + get_subjects_result.Ok[0].address)
//   t.deepEqual(get_subject_message_result.Ok[0].entry.payload, testMessage.payload, 'expected to receive the message back')


//   t.end()
// })

// test('Can create a public channel with some members', (t) => {
//   const init_result = app.call('chat', 'main', 'init', {})
//   console.log(init_result)
//   t.notEqual(init_result.Ok, undefined, 'init should return success')

//   const get_all_members_result = app.call('chat', 'main', 'get_all_members', {})
//   console.log('all members:', get_all_members_result)
//   let allMemberAddrs = get_all_members_result.Ok.map(elem => elem.address)
//   t.true(allMemberAddrs.length > 0, 'gets at least one member')

//   const create_result = app.call('chat', 'main', 'create_channel', {...testNewChannelParams, public: false, initial_members: allMemberAddrs})
//   console.log(create_result)
//   t.deepEqual(create_result.Ok.length, 46)
//   t.end()
// })


/*----------  personas  ----------*/

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
  name: "handle",
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
        profileFieldName: "handle", 
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


// ----------  chat + vault  ---------- //


test('chat vault integration', t => {
  const test_handle = "Test Handle !!"

  // should initially be no profiles
  const getProfilesResult1 = app.call("profiles", "main", "get_profiles", {})
  t.equal(getProfilesResult1.Ok.length, 1, "No profiles should exist yet")

  // first call to init should error but create a profile
  const initResult1 = app.call("chat", "main", "init", {})
  console.log(initResult1)
  t.notEqual(initResult1.Err, undefined, "Should return an error as no mappings are created")

  const getProfilesResult2 = app.call("profiles", "main", "get_profiles", {})
  t.equal(getProfilesResult2.Ok.length, 2, "Init should have created one profile")
  const retrieverDNA = getProfilesResult2.Ok[0].sourceDNA


  // create a persona to map chat to
  const result = app.call("personas", "main", "create_persona", {spec: {name: "chat"}})
  const personaAddress = result.Ok
  const createPersonaResult = app.call("personas", "main", "add_field", {persona_address: personaAddress, field: {name: "handle", data: test_handle}})
  t.notEqual(createPersonaResult.Ok, undefined)

  // create a mapping between the chat profile and the chat persona
    const map_result2 = app.call("profiles", "main", "create_mapping", 
    {
      mapping: {
        retrieverDNA: retrieverDNA, 
        profileFieldName: "handle", 
        personaAddress: personaAddress,
        personaFieldName: "handle"
      }
    })
  console.log(map_result2)
  // should map a single field
  t.deepEqual(map_result2.Ok, { mappings_created: 1 }, "a single mapping should be created");


  // calling init should now succeed!
  const initResult2 = app.call("chat", "main", "init", {})
  console.log(initResult2)
  t.notEqual(initResult2.Ok, undefined, "Should return Ok as a profile exists!")

  // should be able to retrieve this users profile
  const getAllMembersResult = app.call("chat", "main", "get_all_members", {})
  console.log(getAllMembersResult)
  t.notEqual(getAllMembersResult.Ok[0].profile, undefined)


  // get all members


  const getAllStreamsResult = app.call("chat", "main", "get_all_public_streams", {})
  console.log(getAllStreamsResult)
  t.deepEqual(getAllStreamsResult.Ok.length, 0, 'no streams have been created yet')


  const createResult = app.call('chat', 'main', 'create_stream', testNewChannelParams)
  console.log(createResult)
  t.deepEqual(createResult.Ok.length, 46)

  const getAllStreamsResult2 = app.call("chat", "main", "get_all_public_streams", {})
  console.log(getAllStreamsResult2)
  t.deepEqual(getAllStreamsResult2.Ok.length, 1, 'a single public stream should be created')

  t.end()
})
