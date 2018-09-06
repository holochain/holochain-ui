import { ActionType, getType } from 'typesafe-actions';
import * as chatActions from './actions'
import {Channel} from './types/model/channel'
import {Message} from './types/model/message'


// create a union type that is all possible chat actions
export type ChatAction = ActionType<typeof chatActions>;

export interface Identity {
  hash: string,
  handle: string,
  avatar: string
}

export interface IdentitySpec {
  handle: string,
  avatar: string
}

export interface HoloChatState {
  myChannels: Array<Channel>,
  currentMessages: Array<Message>
  activeChannel: Channel | null,
  activeChannelMembers: Array<Identity>,
  myHash: string | null,
}


export const initialState: HoloChatState = {
  myChannels: [],
  currentMessages: [],
  activeChannel: null,
  activeChannelMembers: [],
  myHash: null,
}


export function holochatReducer (state = initialState, action: ChatAction) {
  // console.log('Current state: ', state)
  // console.log('processing action: ', action)
  switch (action.type) {
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
    case getType(chatActions.GetMembers.success):
      return {
        ...state,
        activeChannelMembers: action.payload.data
      }
    case getType(chatActions.SetActiveChannel):
      return {
        ...state,
        activeChannel: action.payload
      }
    case getType(chatActions.Whoami.success):
      return {
        ...state,
        myHash: action.payload.data
      }
    default:
      return state
  }
}



export default holochatReducer
