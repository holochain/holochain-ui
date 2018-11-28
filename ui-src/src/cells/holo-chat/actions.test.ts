import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import axios from 'axios'
import { AnyAction } from 'redux'
// @ts-ignore
import axiosMiddleware from 'redux-axios-middleware'
import MockAdapter from 'axios-mock-adapter'
import * as chatActions from './actions'
import { initialState } from './reducer'

const mockHolochainClient = axios.create({
  baseURL: '/fn/holochain/callBridgedFunction',
  	responseType: 'json',
  	method: 'POST'
})

const mockStore = configureMockStore([axiosMiddleware(mockHolochainClient)])
let store: MockStoreEnhanced
let mock: MockAdapter

beforeEach(() => {
  store = mockStore(initialState)
  mock = new MockAdapter(mockHolochainClient)
})

afterEach(() => {
  mock.reset()
})

function genExpectedAction (zome: string, capability: string, fname: string, data: any): any {
  return {
    type: `holo-chat/${zome}/${fname}`,
    payload: {
      request: {
        data: {
          happ: 'holo-chat',
          zome,
          capability,
          func: fname,
          data: data
        }
      }
    }
  }
}

/**
 *
 * The below test table simplifies the automated testing of multiple actions
 * Each element in the table represents a test for a single action.
 * It has the following form
 * [
 *    function name
 *    callable action creator function
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

const asyncActionTestTable: Array<[string, (input: any) => AnyAction, any, any]> = [
  [
    'create_channel',
    chatActions.CreateChannel.create,
    { channelHash: 'Qmchannelhash', members: ['123abc'] },
    true
  ],
  [
    'add_members',
    chatActions.AddMembers.create,
		{ channelHash: 'Qmchannelhash', members: ['123abc'] },
    true
  ],
  [
    'get_my_channels',
    chatActions.GetMyChannels.create,
    null,
		[{ name: 'channel1', members: ['member1'] }]
  ],
  [
    'get_all_members',
    chatActions.GetAllMembers.create,
    null,
    [{ name: 'channel1', members: ['member1'] }]
  ],
  [
    'get_members',
    chatActions.GetMembers.create,
		{ channelHash: 'xxx' },
		[{ handle: 'wollum', hash: 'Qmmyagenthash', avatar: '' }]
  ],
  [
    'post_message',
    chatActions.PostMessage.create,
		{ channelHash: 'Qmchanelhash', subject: 'Testing subject', message: { content: { text: 'message body' } } },
    'Qmmessagehash'
  ],
  [
    'get_messages',
    chatActions.GetMessages.create,
		{ channelHash: 'Qmchanelhash' },
		{ content: { text: 'message body' } }
  ],
  [
    'get_profile',
    chatActions.GetProfile.create,
    null,
    'Qmmyagenthash'
  ]
]

asyncActionTestTable.forEach(([name, actionCreator, testInput, testResponse]) => {

  describe(`${name} action`, () => {

    const expectedAction = genExpectedAction('chat', 'main', name, testInput)

    it('should create an action that is correctly structured given parameters', () => {
      expect(actionCreator(testInput)).toEqual(expectedAction)
    })

    it('should trigger middleware creating a request response that returns a promise with the response', () => {
      mock.onPost('/').reply(200, testResponse)

	    // @ts-ignore - minor error in the typings for redux/typesafe-actions
	    return store.dispatch(actionCreator(testInput)).then((response) => {
      const actions = store.getActions()
      expect(actions[0]).toEqual(expectedAction)
      expect(response.payload.data).toEqual(testResponse)
	    })
    })
  })
})

// describe('getMessages action', () => {
// 	const testInput = {channelHash: 'xxx'}
// 	const expectedAction = genExpectedAction('custom_channel', 'getMessages', testInput)

// 	it('should create an action that is correctly structured given parameters', () => {
// 		expect(chatActions.GetMembers.create({channelHash: 'xxx'})).toEqual(expectedAction)
// 	})

// 	it('should trigger middleware creating a request response that returns a promise with the response', () => {
// 		mock.onPost('/').reply(200, testResponse)

// 	    // @ts-ignore - minor error in the typings for redux/typesafe-actions
// 	    return store.dispatch(actionCreator(testInput)).then((response) => {
// 			const actions = store.getActions()
// 			expect(actions[0]).toEqual(expectedAction)
// 			expect(response.payload.data).toEqual(testResponse)
// 	    })
// 	})
// })
