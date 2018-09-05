import { combineReducers } from 'redux'
import { ActionType, getType } from 'typesafe-actions';
import * as chatActions from './actions'
import {ViewChannel} from './types/view/channel'
import {ViewMessage} from './types/view/message'
import {ModelChannel} from './types/model/channel'
import {ModelMessage} from './types/model/message'

// create a union type that is all possible chat actions
export type ChatAction = ActionType<typeof chatActions>;

export interface HoloChatState {
  myChannels: Array<ViewChannel>,
  currentMessages: Array<ViewMessage>
}

export const initialState: HoloChatState = {
  myChannels: [],
  currentMessages: []
}

function modelMessagesToDisplayMessages(messages: Array<ModelMessage>) {
  return messages
}

function modelChannelsToDisplayChannels(channels: ModelChannel<ModelChannel>) {
  return channels
}


export function holochatReducer (state = initialState, action: ChatAction) {
  switch (action.type) {
    case getType(chatActions.CreateCustomChannel.success):
      	return state // do nothing for now
    case getType(chatActions.AddMembers.success):
    	return state // do nothing for now
    case getType(chatActions.GetMyChannels.success):
    	return {
        ...state,
        myChannels: modelChannelsToDisplayChannels(action.payload.data)
      }
    case getType(chatActions.GetMessages.success):
      return {
        ...state,
        currentMessages: modelMessagesToDisplayMessages(action.payload.data)
      }
    default:
      return state
  }
}



export default combineReducers({
  holochat: holochatReducer
})
