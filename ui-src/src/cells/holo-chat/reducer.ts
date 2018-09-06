import { ActionType, getType } from 'typesafe-actions';
import * as chatActions from './actions'
import {Channel} from './types/model/channel'
import {Message} from './types/model/message'


// create a union type that is all possible chat actions
export type ChatAction = ActionType<typeof chatActions>;

export interface HoloChatState {
  myChannels: Array<Channel>,
  currentMessages: Array<Message>
  activeChannel: Channel | null,
}

export const initialState: HoloChatState = {
  myChannels: [],
  currentMessages: [],
  activeChannel: null
}


export function holochatReducer (state = initialState, action: ChatAction) {
  console.log('Current state: ', state)
  console.log('processing action: ', action)
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
    case getType(chatActions.SetActiveChannel):
      return {
        ...state,
        activeChannel: action.payload
      }
    default:
      return state
  }
}



export default holochatReducer
