import { holochatReducer,  initialState } from './reducer'
import { getType } from 'typesafe-actions';
import { AxiosResponse } from 'axios'

import * as chatActions from './actions'

describe('Chat Reducer', () => {
	it('Should update the state when a getMyChannels success action is received', () => {
		expect(holochatReducer(undefined, {
			type: getType(chatActions.getMyChannels.success),
			payload: {
				data: ['channel1', 'channel2']
			} as AxiosResponse
		})).toEqual({
			...initialState,
			myChannels: ['channel1', 'channel2']
		})
	})
})