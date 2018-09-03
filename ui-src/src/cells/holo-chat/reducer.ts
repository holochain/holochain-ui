import { combineReducers } from 'redux'
import { ActionType, getType } from 'typesafe-actions';
import * as chatActions from './actions'
import {Channel} from './types/channel'

// create a union type that is all possible chat actions
export type ChatAction = ActionType<typeof chatActions>;

export interface HoloChatState {
  myChannels: Array<Channel>
}

export const initialState: HoloChatState = {
  myChannels: []
}


export function holochatReducer (state = initialState, action: ChatAction) {
  switch (action.type) {
    case getType(chatActions.CreateCustomChannel.success):
      	console.log("create custom channel action triggered!");
      	return state // do nothing for now
    case getType(chatActions.addMembers.success):
    	console.log("add members action triggered")
    	return state
    case getType(chatActions.getMyChannels.success):
    	return {
        ...state,
        myChannels: action.payload.data
      }
    default:
      return state
  }
}



export default combineReducers({
  holochat: holochatReducer
})
