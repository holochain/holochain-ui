import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import axios from 'axios'
// @ts-ignore
import axiosMiddleware from 'redux-axios-middleware'
import MockAdapter from 'axios-mock-adapter'
import * as chatActions from './actions'
import {initialState} from './reducer'

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
	mock = new MockAdapter(mockHolochainClient);
	mock.onPost('/').reply(200, 'channel-hash-12345')
})

afterEach(() => {
	mock.reset()
})

function genExpectedAction(fname: string, data: any): any {
	return {
		type: 'holochat/'+fname,
		payload: {
			request: {
				data: {
					channel: 'holo-chat',
					zome: 'custom_channel',
					func: fname,
					data: data
				}
			}
		}
	}
}


describe('createCustomChannel action', () => {

	const testInput = {name: 'test channel', description: '', members: ['123abc']}
	const expectedAction = genExpectedAction('createCustomChannel', testInput)

	it('should create an action that is correctly structured given parameters', () => {
		expect(chatActions.createCustomChannel(testInput)).toEqual(expectedAction)
	})

	it('should trigger middleware creating a request response', () => {
	    // @ts-ignore - minor error in the typings for redux/typesafe-actions
	    return store.dispatch(chatActions.createCustomChannel({name: 'test channel', description: '', members: ['123abc']})).then(() => {
			const actions = store.getActions()
			expect(actions[0]).toEqual(expectedAction)
			expect(store.getActions()[1].type).toEqual('holochat/createCustomChannel_SUCCESS')
			expect(store.getActions()[1].payload.data).toEqual('channel-hash-12345')
			expect(store.getState()).toEqual(initialState)
	    })

	})
})


describe('getMyChannels action', () => {

	const expectedAction = {
		type: 'holochat/getMyChannels',
		payload: {
			request: {
				data: {
					channel: 'holo-chat',
					zome: 'custom_channel',
					func: 'getMyChannels',
					data: {}
				}
			}
		}
	}


	it('should produce the correct action type', () => {
		expect(chatActions.getMyChannels()).toEqual(expectedAction)
	})

	it('should trigger middleware and create the correct response', () => {
		mock.onPost('/').reply(200, ['channel1', 'channel2'])
	})

	const store = mockStore({})
    // @ts-ignore - minor error in the typings for redux/typesafe-actions
    return store.dispatch(chatActions.getMyChannels()).then(() => {
      // return of async actions
      const actions = store.getActions()
      expect(actions[0]).toEqual(expectedAction)
      expect(store.getActions()[1].type).toEqual('holochat/getMyChannels_SUCCESS')
      expect(store.getActions()[1].payload.data).toEqual(['channel1', 'channel2'])
    })
})

// TODO: write tests for other action creators