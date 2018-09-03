import { combineReducers } from 'redux'
import { ActionType, getType } from 'typesafe-actions';
import * as chatActions from './actions'

// create a union type that is all possible chat actions
export type ChatAction = ActionType<typeof chatActions>;

export interface HoloChatState { }

const initialState: HoloChatState = { }



function holochatReducer (state = initialState, action: ChatAction) {
  switch (action.type) {
    case getType(chatActions.createCustomChannel):
      	console.log("create custom channel action triggered!");
      	return state // do nothing for now
    case getType(chatActions.addMembers):
    	console.log("add members action triggered")
    	return state
    case getType(chatActions.getMyChannels):
    	console.log("get my channels action triggered")
    	return state
    default:
      return state
  }
}



export default combineReducers({
  holochat: holochatReducer
})
