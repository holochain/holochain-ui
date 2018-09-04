import { combineReducers } from 'redux'
import { ActionType, getType } from 'typesafe-actions';
import * as chatActions from './actions'
import {Channel} from './types/view/channel'
import {Message} from './types/view/message'


// create a union type that is all possible chat actions
export type ChatAction = ActionType<typeof chatActions>;

export interface HoloChatState {
  myChannels: Array<Channel>,
  activeChannel: Channel,
  currentMessages: Array<Message>
}

export const initialState: HoloChatState = {
  myChannels: [],
  currentMessages: [],
  activeChannel: null
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
        myChannels: action.payload.data
      }
    case getType(chatActions.GetMessages.success):
      return {
        ...state,
        currentMessages: action.payload.data
      }
    default:
      return state
  }
}



export default combineReducers({
  holochat: holochatReducer
})
