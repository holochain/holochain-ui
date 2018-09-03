import configureMockStore from 'redux-mock-store'
import axios from 'axios'
// @ts-ignore
import axiosMiddleware from 'redux-axios-middleware'
import MockAdapter from 'axios-mock-adapter'
import * as chatActions from './actions'

const mockHolochainClient = axios.create({
	baseURL: '/fn/holochain/callBridgedFunction',
  responseType: 'json',
  method: 'POST'
})

const mockStore = configureMockStore([axiosMiddleware(mockHolochainClient)])


describe('createCustomChannel action', () => {
	let mock: MockAdapter

	beforeEach(() => {
		mock = new MockAdapter(mockHolochainClient);
	})

	afterEach(() => {
		mock.reset()
	})

	it('should create an action that is correctly structured given parameters', () => {
		const expectedAction = {
			type: 'holochat/createCustomChannel',
			meta: undefined,
			payload: {
				request: {
					url: '/',
					data: {
						channel: 'holo-chat',
						zome: 'custom_channel',
						func: 'createCustomChannel',
						data: {members: ['123abc']}
					}
				}
			}
		}
		expect(chatActions.createCustomChannel(['123abc'])).toEqual(expectedAction)
	})


	it('should trigger middleware creating a request response', () => {

		mock.onPost('/').reply(200, 'CHANNEL_UUID_000')

		const expectedAction = {
			type: 'holochat/createCustomChannel',
			payload: {
				request: {
					url: '/',
					data: {
						channel: 'holo-chat',
						zome: 'custom_channel',
						func: 'createCustomChannel',
						data: {members: ['123abc']}
					}
				}
			}
		}



    const store = mockStore({})
    return store.dispatch(chatActions.createCustomChannel(['123abc'])).then(() => {
      // return of async actions
      const actions = store.getActions()
      expect(actions[0]).toEqual(expectedAction)
      expect(store.getActions()[1].type).toEqual('holochat/createCustomChannel_SUCCESS')
      expect(store.getActions()[1].payload.data).toEqual('CHANNEL_UUID_000')
    })

	})
})

// TODO: write tests for other action creators