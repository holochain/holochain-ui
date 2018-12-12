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
  readonly messages: Array<Message>
  readonly activeChannel: Channel | null,
  readonly activeChannelMembers: Array<Identity>,
  readonly myHash: string | null,
  readonly members: Array<Identity>,
  readonly subjects: Array<Subject>
}

export const initialState: HoloChatState = {
  myChannels: [],
  channelSubjects: Map(),
  messages: [],
  activeChannel: null,
  activeChannelMembers: [],
  myHash: null,
  members: [],
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
      channels.sort((one, two) => (one.name > two.name ? 1 : -1))
      return {
        ...state,
        myChannels: channels
      }
    case getType(chatActions.CreateChannel.success):
      return {
        ...state,
        channelAddress: action.payload
      }
    case getType(chatActions.GetMessages.success):
      let messages: Array<Message> = action.payload.map((result: any) => ({
        address: result.address,
        ...result.entry
      }))
      // console.log(messages)
      return {
        ...state,
        messages: messages
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
      let users: Array<Identity> = action.payload.map((elem: {address: string, entry: any}) => {
        elem.entry.profile = elem.entry.profile || { handle: 'no handle', email: 'no email', avatar: '' }
        return {
          agentId: elem.address,
          ...elem.entry.profile
        }
      })
      return {
        ...state,
        members: members
      }
    case getType(chatActions.GetSubjects.success):
      let subjects: Array<Subject> = action.payload.map((result: any) => ({
        address: result.address,
        ...result.entry
      }))
      if (subjects.length > 0) {
        // Remove any exisitng subjects for the channel and push the new ones in
        let channelAddress: string = subjects[0].channel_address
        let stateSubjects: Array<Subject> = state.subjects.filter(function (subject: Subject) {
          return subject.channel_address !== channelAddress
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
    case getType(chatActions.SetChannelAddress):
      return {
        ...state,
        channelAddress: action.payload
      }
    case getType(chatActions.SetSubjectAddress):
      return {
        ...state,
        subjectAddress: action.payload
      }
    default:
      return state
  }
}

export default holochatReducer
