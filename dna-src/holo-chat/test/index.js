// This test file uses the tape testing framework. 
// To learn more, go here: https://github.com/substack/tape
const test = require('tape');

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
  const create_result = app.call('chat', 'main', 'create_channel', JSON.stringify(testNewChannelParams))
  console.log(create_result)
  t.deepEqual(JSON.parse(create_result).address.length, 46)

  const get_result = app.call('chat', 'main', 'get_my_channels', JSON.stringify({}))
  console.log(get_result)
  t.deepEqual(JSON.parse(get_result).length, 1)

  t.end()
})

test('Can post a message to the channel and retrieve', (t) => {
  const create_result = app.call('chat', 'main', 'create_channel', JSON.stringify(testNewChannelParams))
  console.log(create_result)
  const channel_addr = JSON.parse(create_result).address
  t.deepEqual(channel_addr.length, 46)

  const get_result = app.call('chat', 'main', 'get_my_channels', JSON.stringify({}))
  console.log(get_result)
  t.deepEqual(JSON.parse(get_result).length, 1)

  const post_result = app.call('chat', 'main', 'post_message', JSON.stringify({channel_address: channel_addr, message: testMessage}))
  console.log(post_result)
  t.deepEqual(JSON.parse(post_result), {success: true})

  const get_message_result = app.call('chat', 'main', 'get_messages', JSON.stringify({channel_address: channel_addr, min_count: 10}))
  console.log(get_message_result)
  const messages = JSON.parse(get_message_result)
  t.deepEqual(messages[0]. testMessage)
  t.end()
})

// test('Can create a public channel with some members', (t) => {
//   const create_result = app.call('chat', 'main', 'create_channel', JSON.stringify({...testNewChannelParams, initial_members: [{id: "id123"}]}))
//   console.log(create_result)
//   t.deepEqual(JSON.parse(create_result), {success: true})
//   t.end()
// })