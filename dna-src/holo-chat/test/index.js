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
  timestamp: "100000",
  author: "glibglob",
  message_type: "text",
  payload: "{}",
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

  const get_message_result = app.call('chat', 'main', 'get_messages', {channel_address: channel_addr, min_count: 10})
  console.log(get_message_result)
  const messages = get_message_result
  t.deepEqual(messages[0], testMessage, 'expected to receive the message back')

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
  t.deepEqual(get_subjects_result, ['memes'])

  t.end()
})

test('Can create a public channel with some members', (t) => {
  const init_result = app.call('chat', 'main', 'init', {})

  const create_result = app.call('chat', 'main', 'create_channel', {...testNewChannelParams, initial_members: [{id: "wollum"}]})
  console.log(create_result)
  t.deepEqual(create_result.address.length, 46)
  t.end()
})
