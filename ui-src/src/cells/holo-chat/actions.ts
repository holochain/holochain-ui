import { createAction } from 'typesafe-actions'
import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware'

// import { Message, MessageSpec } from './types/model/message'
import { ChannelSpec } from './types/model/channel'
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

export const Init = createHolochainAsyncAction<{}, null>('holo-chat', 'chat', 'main', 'init')

export const CreateChannel = createHolochainAsyncAction<ChannelSpec, Address>('holo-chat', 'chat', 'main', 'create_channel')

export const AddMembers = createHolochainAsyncAction<any, any>('holo-chat', 'chat', 'main', 'add_members')

export const GetMyChannels = createHolochainAsyncAction<any, Array<any>>('holo-chat', 'chat', 'main', 'get_my_channels')

export const GetSubjects = createHolochainAsyncAction<any, Array<any>>('holo-chat', 'chat', 'main', 'get_subjects')

export const GetAllMembers = createHolochainAsyncAction<{}, Vec<Member>>('holo-chat', 'chat', 'main', 'get_all_members')

export const GetMembers = createHolochainAsyncAction<Address, Vec<Member>>('holo-chat', 'chat', 'main', 'get_members')

export const PostMessage = createHolochainAsyncAction<any, any>('holo-chat', 'chat', 'main', 'post_message')

export const GetMessages = createHolochainAsyncAction<any, Array<any>>('holo-chat', 'chat', 'main', 'get_messages')

export const GetProfile = createHolochainAsyncAction<any, string>('holo-chat', 'chat', 'main', 'get_profile')

// export const GetIdentity = createHolochainAsyncAction<string, Identity>('holo-chat', 'users', 'main', 'getIdentity')

// export const SetIdentity = createHolochainAsyncAction<IdentitySpec, boolean>('holo-chat', 'users', 'main', 'setIdentity')

/*----------  Non-holochain actions  ----------*/

export const SetChannelAddress = createAction('holochat/setChannelAddress', resolve => {
  return (channelAddress: String) => resolve(channelAddress)
})

export const SetSubjectAddress = createAction('holochat/setSubject', resolve => {
  return (subjectAddress: String) => resolve(subjectAddress)
})

/*=====  End of Action Type Definitions  ======*/
