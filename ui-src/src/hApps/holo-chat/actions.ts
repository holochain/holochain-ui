import { createAction } from 'typesafe-actions'
import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware'

// import { Message, MessageSpec } from './types/model/message'
import { StreamSpec } from './types/model/stream'
// import { Identity } from './types/model/identity'
// import { Subject } from './types/model/subject'
type Address = string
type Vec<T> = Array<T>

// interface GetLinksLoadResult<T> {
//   address: string,
//   entry: T
// }

interface Member {
  address: string,
  profile: any
}

/*===============================================
=            Action Type Definitions            =
===============================================*/

/*----------  Holochain actions  ----------*/

export const Init = createHolochainAsyncAction<{}, null>(`holo-chat`, 'chat', 'main', 'init')

export const CreateStream = createHolochainAsyncAction<StreamSpec, string>(`holo-chat`, 'chat', 'main', 'create_stream')

export const AddMembers = createHolochainAsyncAction<any, any>(`holo-chat`, 'chat', 'main', 'add_members')

export const GetMyStreams = createHolochainAsyncAction<any, Array<any>>(`holo-chat`, 'chat', 'main', 'get_my_streams')

export const GetSubjects = createHolochainAsyncAction<any, Array<any>>(`holo-chat`, 'chat', 'main', 'get_subjects')

export const GetAllMembers = createHolochainAsyncAction<{}, Vec<Member>>(`holo-chat`, 'chat', 'main', 'get_all_members')

export const GetMembers = createHolochainAsyncAction<Address, Vec<Member>>(`holo-chat`, 'chat', 'main', 'get_members')

export const PostMessage = createHolochainAsyncAction<any, any>(`holo-chat`, 'chat', 'main', 'post_message')

export const GetMessages = createHolochainAsyncAction<any, Array<any>>(`holo-chat`, 'chat', 'main', 'get_messages')

export const GetProfile = createHolochainAsyncAction<any, string>(`holo-chat`, 'chat', 'main', 'get_profile')

// export const GetIdentity = createHolochainAsyncAction<string, Identity>(`holo-chat`, 'users', 'main', 'getIdentity')

// export const SetIdentity = createHolochainAsyncAction<IdentitySpec, boolean>(`holo-chat`, 'users', 'main', 'setIdentity')

/*----------  Non-holochain actions  ----------*/

export const SetStreamAddress = createAction('holochat/setStreamAddress', resolve => {
  return (streamAddress: String) => resolve(streamAddress)
})

export const SetSubjectAddress = createAction('holochat/setSubject', resolve => {
  return (subjectAddress: String) => resolve(subjectAddress)
})

/*=====  End of Action Type Definitions  ======*/
