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

function genExpectedAction(zome: string, fname: string, data: any): any {
	return {
		type: `holo-chat/${zome}/${fname}`,
		payload: {
			request: {
				data: {
					channel: 'holo-chat',
					zome: zome,
					func: fname,
					data: data
				}
			}
		}
	}
}

const asyncActionTestTable: Array<[string, string, (input: any) => AnyAction, any, any]> = [
	[
		'custom_channel',
		'createCustomChannel', 
		chatActions.CreateCustomChannel.create, 
		{name: 'test channel', description: '', members: ['123abc']}, 
		'channel-hash-12345'
	],
	[
		'custom_channel',
		'addMembers', 
		chatActions.AddMembers.create, 
		{channelHash: 'Qmchannelhash', members: ['123abc']}, 
		true
	],
	[
		'custom_channel',
		'getMyChannels', 
		chatActions.GetMyChannels.create, 
		null, 
		[{name: 'channel1', members: ['member1']}]
	],
	//TODO: add test for getMembers
	[
		'custom_channel',
		'postMessage', 
		chatActions.PostMessage.create, 
		{channelHash: 'Qmchanelhash', message: {content:{text:'message body'}}}, 
		'Qmmessagehash'
	],
	//TODO: add test for getMessages
	[
		'users',
		'whoami', 
		chatActions.Whoami.create, 
		null, 
		'Qmmyagenthash'
	],
	[
		'users',
		'getIdentity', 
		chatActions.GetIdentity.create, 
		null, 
		{handle: 'wollum', hash: 'Qmmyagenthash', avatar: ''}
	],
	[
		'users',
		'setIdentity', 
		chatActions.SetIdentity.create, 
		{handle: 'newHandle', avatar: ''}, 
		true
	],
	[
		'users',
		'getUsers', 
		chatActions.GetUsers.create, 
		null, 
		[{handle: 'wollum', hash: 'Qmmyagenthash', avatar: ''}]
	],
]

asyncActionTestTable.forEach(([zome, name, actionCreator, testInput, testResponse]) => {

	describe(`${name} action`, () => {

		const expectedAction = genExpectedAction(zome, name, testInput)

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


