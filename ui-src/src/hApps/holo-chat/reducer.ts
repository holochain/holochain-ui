import { ActionType, getType } from 'typesafe-actions'
import * as chatActions from './actions'
import { Stream } from './types/model/stream'
import { Message } from './types/model/message'
import { Identity } from './types/model/identity'
import { Subject } from './types/model/subject'
import { Map } from 'immutable'

// create a union type that is all possible chat actions
export type ChatAction = ActionType<typeof chatActions>

export interface HoloChatState {
  readonly myStreams: Array<Stream>,
  readonly streamSubjects: Map<String, Array<String>>,
  readonly messages: Array<Message>
  readonly activeStream: Stream | null,
  readonly activeStreamMembers: Array<Identity>,
  readonly myHash: string | null,
  readonly members: Array<Identity>,
  readonly subjects: Array<Subject>
}

export const initialState: HoloChatState = {
  myStreams: [],
  streamSubjects: Map(),
  messages: [],
  activeStream: null,
  activeStreamMembers: [],
  myHash: null,
  members: [],
  subjects: []
}

export function holochatReducer (state = initialState, action: ChatAction) {
  // console.log('Current state: ', state)
  // console.log('processing action: ', action)
  switch (action.type) {
    case getType(chatActions.GetMyStreams.success):
      let streams: Array<Stream> = action.payload.map((result: any) => ({
        address: result.address,
        ...result.entry
      }))
      streams.sort((one, two) => (one.name > two.name ? 1 : -1))
      return {
        ...state,
        myStreams: streams
      }
    case getType(chatActions.CreateStream.success):
      console.log(action.payload)
      return {
        ...state,
        streamAddress: action.payload
      }
    case getType(chatActions.GetMessages.success):
      let messages: Array<Message> = action.payload.map((result: any) => ({
        address: result.address,
        ...result.entry
      }))
      messages.sort((one, two) => (one.timestamp > two.timestamp ? 1 : -1))
      return {
        ...state,
        messages: messages
      }
    case getType(chatActions.GetMembers.success):
      let activeStreamMembers: Array<Identity> = action.payload.map((elem: {address: string, profile: any}) => {
        elem.profile = elem.profile || { handle: 'no handle', email: 'no email', avatar: '' }
        return {
          agentId: elem.address,
          ...elem.profile
        }
      })
      return {
        ...state,
        activeStreamMembers
      }
    case getType(chatActions.GetProfile.success):
      return {
        ...state,
        myHash: action.payload
      }
    case getType(chatActions.GetAllMembers.success):
      let members: Array<Identity> = action.payload.map((elem: {address: string, profile: any}) => {
        elem.profile = elem.profile || { handle: 'no handle', email: 'no email', avatar: '' }
        return {
          agentId: elem.address,
          ...elem.profile
        }
      })
      return {
        ...state,
        members
      }
    case getType(chatActions.GetSubjects.success):
      let subjects: Array<Subject> = action.payload.map((result: any) => ({
        address: result.address,
        ...result.entry
      }))
      if (subjects.length > 0) {
        // Remove any exisitng subjects for the stream and push the new ones in
        let streamAddress: string = subjects[0].stream_address
        let stateSubjects: Array<Subject> = state.subjects.filter(function (subject: Subject) {
          return subject.stream_address !== streamAddress
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
    case getType(chatActions.SetStreamAddress):
      return {
        ...state,
        streamAddress: action.payload
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
