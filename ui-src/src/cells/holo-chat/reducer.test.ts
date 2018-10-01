import { holochatReducer,  initialState } from './reducer'
import { getType } from 'typesafe-actions';
import { AxiosResponse } from 'axios'

import * as chatActions from './actions'
import { MessageType } from './types/message'

describe('Chat Reducer', () => {

	it('Should update the state in response to GetMyChannels', () => {
		expect(holochatReducer(undefined, {
			type: getType(chatActions.GetMyChannels.success),
			payload: {
				data: ['channel1', 'channel2']
			} as AxiosResponse
		})).toEqual({
			...initialState,
			myChannels: ['channel1', 'channel2']
		})
	})

	it('Should update the state in response to GetMessages', () => {
		expect(holochatReducer(undefined, {
			type: getType(chatActions.GetMessages.success),
			payload: {
				data: [{type: MessageType.CHAT, author: 'xxx', timestamp: 0, content: '', replies: [], channelId: ''}]
			} as AxiosResponse
		})).toEqual({
			...initialState,
			currentMessages: [{type: MessageType.CHAT, author: 'xxx', timestamp: 0, content: '', replies: [], channelId: ''}]
		})
	})

	it('Should update the state in response to GetMembers', () => {
		expect(holochatReducer(undefined, {
			type: getType(chatActions.GetMembers.success),
			payload: {
				data: [{handle: 'a', avatar: ''}, {handle: 'b', avatar: ''}]
			} as AxiosResponse
		})).toEqual({
			...initialState,
			activeChannelMembers: [{handle: 'a', avatar: ''}, {handle: 'b', avatar: ''}]
		})
	})

})