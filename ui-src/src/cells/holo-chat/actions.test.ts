import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as chatActions from './actions'
import { initialState } from './reducer'

const mockStore = configureMockStore([thunk])
let store: MockStoreEnhanced

beforeEach(() => {
  store = mockStore(initialState)
})

/**
 *
 * The below test table simplifies the automated testing of multiple actions
 * Each element in the table represents a test for a single action.
 * It has the following form
 * [
 *    function name
 *    async action object that implements create() and request()
 *    test payload
 *    example response
 * ]
 *
 * The test will pass if the action returned by the action creator function equals the expected response
 * from genExpectedAction.
 *
 * It also test that dispatching this action to a mock store with a mock HTTP responder returns the expected response
 *
 */

const asyncActionTestTable: Array<[string, any, any, any]> = [
  [
    'create_channel',
    chatActions.CreateChannel,
    { channelHash: 'Qmchannelhash', members: ['123abc'] },
    true
  ],
  [
    'add_members',
    chatActions.AddMembers,
    { channelHash: 'Qmchannelhash', members: ['123abc'] },
    true
  ],
  [
    'get_my_channels',
    chatActions.GetMyChannels,
    null,
    [{ name: 'channel1', members: ['member1'] }]
  ],
  [
    'get_all_members',
    chatActions.GetAllMembers,
    null,
    [{ name: 'channel1', members: ['member1'] }]
  ],
  [
    'get_members',
    chatActions.GetMembers,
    { channelHash: 'xxx' },
    [{ handle: 'wollum', hash: 'Qmmyagenthash', avatar: '' }]
  ],
  [
    'post_message',
    chatActions.PostMessage,
    { channelHash: 'Qmchanelhash', subjects: ['Testing subject'], message: { content: { text: 'message body' } } },
    'Qmmessagehash'
  ],
  [
    'get_messages',
    chatActions.GetMessages,
    { channelHash: 'Qmchanelhash' },
    { content: { text: 'message body' } }
  ],
  [
    'get_profile',
    chatActions.GetProfile,
    null,
    'Qmmyagenthash'
  ]
]

asyncActionTestTable.forEach(([name, action, testInput, testResponse]) => {

  describe(`${name} action`, () => {

    it('should create an action that is correctly structured given parameters', async () => {
      await store.dispatch(action.create(testInput))
      console.log(store.getActions()[0])
      expect(store.getActions()[0]).toEqual(action.request(testInput))
    })
  })
})
