import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import axios from 'axios'
import {AnyAction} from 'redux'
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

const asyncActionTestTable: Array<[string, (input: any) => AnyAction, any, any]> = [
	[
		'createCustomChannel', 
		chatActions.createCustomChannel, 
		{name: 'test channel', description: '', members: ['123abc']}, 
		'channel-hash-12345'
	],
	[
		'addMembers', 
		chatActions.addMembers, 
		{channelHash: 'Qmchannelhash', members: ['123abc']}, 
		true
	],
	[
		'getMyChannels', 
		chatActions.getMyChannels, 
		{}, 
		[{name: 'channel1', members: ['member1']}]
	],
	[
		'getMembers', 
		chatActions.getMembers, 
		'Qmchannelhash', 
		[{handle: 'member'}]
	],
	[
		'postMessage', 
		chatActions.postMessage, 
		{channelHash: 'Qmchanelhash', message: {content:{text:'message body'}}}, 
		'Qmmessagehash'
	]
]

asyncActionTestTable.forEach(([name, actionCreator, testInput, testResponse]) => {

	describe(`${name} action`, () => {

		const expectedAction = genExpectedAction(name, testInput)

		it('should create an action that is correctly structured given parameters', () => {
			expect(actionCreator(testInput)).toEqual(expectedAction)
		})

		it('should trigger middleware creating a request response and correctly modify the state', () => {
			mock.onPost('/').reply(200, testResponse)
		    // @ts-ignore - minor error in the typings for redux/typesafe-actions
		    return store.dispatch(actionCreator(testInput)).then(() => {
				const actions = store.getActions()
				expect(actions[0]).toEqual(expectedAction)
				expect(store.getActions()[1].payload.data).toEqual(testResponse)
		    })
		})
	})

})


