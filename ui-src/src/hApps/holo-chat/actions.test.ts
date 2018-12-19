import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'

import * as chatActions from './actions'
import { initialState } from './reducer'

const mockStore = configureMockStore()
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
    'create_stream',
    chatActions.CreateStream,
    { streamHash: 'Qmstreamhash', members: ['123abc'] },
    true
  ],
  [
    'add_members',
    chatActions.AddMembers,
    { streamHash: 'Qmstreamhash', members: ['123abc'] },
    true
  ],
  [
    'get_my_streams',
    chatActions.GetMyStreams,
    null,
    [{ name: 'stream1', members: ['member1'] }]
  ],
  [
    'get_all_members',
    chatActions.GetAllMembers,
    null,
    [{ name: 'stream1', members: ['member1'] }]
  ],
  [
    'get_members',
    chatActions.GetMembers,
    { streamHash: 'xxx' },
    [{ handle: 'wollum', hash: 'Qmmyagenthash', avatar: '' }]
  ],
  [
    'post_message',
    chatActions.PostMessage,
    { streamHash: 'Qmchanelhash', subjects: ['Testing subject'], message: { content: { text: 'message body' } } },
    'Qmmessagehash'
  ],
  [
    'get_messages',
    chatActions.GetMessages,
    { streamHash: 'Qmchanelhash' },
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

    it('should create an action that is correctly structured given parameters', () => {
      store.dispatch(action.create(testInput))
      expect(store.getActions()[0]).toEqual(action.create(testInput))
    })
  })
})
