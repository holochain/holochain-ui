// This test file uses the tape testing framework.
// To learn more, go here: https://github.com/substack/tape
const test = require('tape');
const Container = require('@holochain/holochain-nodejs-bleeding')

// instantiate an app from the DNA JSON bundle
const app = Container.loadAndInstantiate("dist/bundle.json")

// activate the new instance
app.start()

const testNewStreamParams = {
  name: "test new stream",
  description: "for testing...",
  initial_members: [],
  public: true
}

const testMessage = {
  message_type: "text",
  timestamp: 1,
  payload: "I am the message payload",
  meta: "{}",
}

test('Can create a public stream with no other members and retrieve it', (t) => {
  const init_result = app.call('chat', 'main', 'init', {})
  console.log(init_result)
  t.notEqual(init_result.Ok, undefined, 'init should return success')

  const create_result = app.call('chat', 'main', 'create_stream', testNewStreamParams)
  console.log(create_result)
  t.deepEqual(create_result.Ok.length, 46)

  const get_result = app.call('chat', 'main', 'get_my_streams', {})
  console.log(get_result)
  t.deepEqual(get_result.Ok.length, 1)

  t.end()
})

test('Can retrieve all the members that are added by init', t => {
  const init_result = app.call('chat', 'main', 'init', {})
  console.log(init_result)
  t.notEqual(init_result.Ok, undefined, 'init should return success')

  const getAllMembersResult = app.call('chat', 'main', 'get_all_members', {})
  console.log(getAllMembersResult.Ok)
  t.equal(getAllMembersResult.Ok.length, 6) // will fail if we change test data

  t.end()
})

test('Can post a message to the stream and retrieve', (t) => {
  const init_result = app.call('chat', 'main', 'init', {})
  console.log(init_result)
  t.notEqual(init_result.Ok, undefined, 'init should return success')

  const create_result = app.call('chat', 'main', 'create_stream', testNewStreamParams)
  console.log(create_result)
  const stream_addr = create_result.Ok
  t.deepEqual(stream_addr.length, 46)

  const get_result = app.call('chat', 'main', 'get_my_streams', {})
  console.log(get_result)
  t.deepEqual(get_result.Ok.length, 1)

  const post_result = app.call('chat', 'main', 'post_message', {stream_address: stream_addr, message: testMessage, subjects: []})
  console.log(post_result)
  t.notEqual(post_result.Ok, undefined, 'post should return Ok')

  const get_message_result = app.call('chat', 'main', 'get_messages', {address: stream_addr})
  console.log(get_message_result)
  t.deepEqual(get_message_result.Ok[0].entry.payload, testMessage.payload, 'expected to receive the message back')
  t.end()
})


test('Can post a message with a subject and this is added to the stream', t => {
  const init_result = app.call('chat', 'main', 'init', {})
  console.log(init_result)
  t.notEqual(init_result.Ok, undefined, 'init should return success')

  const create_result = app.call('chat', 'main', 'create_stream', testNewStreamParams)
  console.log(create_result)
  const stream_addr = create_result.Ok
  t.deepEqual(stream_addr.length, 46)

  const post_result = app.call('chat', 'main', 'post_message', {stream_address: stream_addr, message: testMessage, subjects: ['subject 1', 'subject 2']})
  console.log(post_result)
  t.notEqual(post_result.Ok, undefined, 'post should return success')

  const get_subjects_result = app.call('chat', 'main', 'get_subjects', {stream_address: stream_addr})
  console.log(get_subjects_result)
  t.deepEqual(get_subjects_result.Ok.length, 2)
  t.deepEqual(get_subjects_result.Ok[0].entry.stream_address.length, 46)
  t.deepEqual(get_subjects_result.Ok[0].address.length, 46)

  const get_subject_message_result = app.call('chat', 'main', 'get_messages', {address: get_subjects_result.Ok[0].address})
  console.log('Messages linked to the subject' + get_subjects_result.Ok[0].address)
  t.deepEqual(get_subject_message_result.Ok[0].entry.payload, testMessage.payload, 'expected to receive the message back')


  t.end()
})

test('Can create a public stream with some members', (t) => {
  const init_result = app.call('chat', 'main', 'init', {})
  console.log(init_result)
  t.notEqual(init_result.Ok, undefined, 'init should return success')
  const create_result = app.call('chat', 'main', 'create_stream', {...testNewStreamParams, public: false, initial_members: [{id: "jeanmrussell"}, {id: "artbrock"}]})
  console.log(create_result)
  t.deepEqual(create_result.Ok.length, 46)
  t.end()
})
