import { ActionType, getType } from 'typesafe-actions'
import * as chatActions from './actions'
import { Channel } from './types/model/channel'
import { Message } from './types/model/message'
import { Identity } from './types/model/identity'
import { Subject } from './types/model/subject'
import { Map } from 'immutable'

// create a union type that is all possible chat actions
export type ChatAction = ActionType<typeof chatActions>

export interface HoloChatState {
  readonly myChannels: Array<Channel>,
  readonly channelSubjects: Map<String, Array<String>>,
  readonly currentMessages: Array<Message>
  readonly activeChannel: Channel | null,
  readonly activeChannelMembers: Array<Identity>,
  readonly myHash: string | null,
  readonly users: Array<Identity>,
  readonly subjects: Array<Subject>
}

export const initialState: HoloChatState = {
  myChannels: [],
  channelSubjects: Map(),
  currentMessages: [],
  activeChannel: null,
  activeChannelMembers: [],
  myHash: null,
  users: [],
  subjects: []
}

export function holochatReducer (state = initialState, action: ChatAction) {
  // console.log('Current state: ', state)
  // console.log('processing action: ', action)
  switch (action.type) {
    case getType(chatActions.GetMyChannels.success):
      let channels: Array<Channel> = action.payload.map((result: any) => ({
        address: result.address,
        ...result.entry
      }))
      return {
        ...state,
        myChannels: channels
      }
    case getType(chatActions.GetMessages.success):
      return {
        ...state,
        currentMessages: action.payload
      }
    case getType(chatActions.GetMembers.success):
      return {
        ...state,
        activeChannelMembers: action.payload
      }
    case getType(chatActions.GetProfile.success):
      return {
        ...state,
        myHash: action.payload
      }
    case getType(chatActions.GetAllMembers.success):
      let users: Array<Identity> = action.payload.map((user: any) => ({
        hash: user.id,
        handle: user.profile.handle,
        email: user.profile.email,
        avatar: user.profile.avatar
      }))
      return {
        ...state,
        users: users
      }
    case getType(chatActions.GetSubjects.success):
      let subjects: Array<Subject> = action.payload
      if (subjects.length > 0) {
        // Remove any exisitng subjects for the channel and push the new ones in
        let channelAddress: string = subjects[0].channelAddress
        let stateSubjects: Array<Subject> = state.subjects.filter(function (subject: Subject) {
          return subject.channelAddress !== channelAddress
        })
        return {
          ...state,
          subjects: stateSubjects.concat(subjects)
        }
      } else {
        return {
          ...state
        }
      }

    default:
      return state
  }
}

export default holochatReducer
