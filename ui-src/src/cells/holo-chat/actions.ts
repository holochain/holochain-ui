import { createAction } from 'typesafe-actions'
import { createHolochainAsyncAction } from '../../utils/holochainAxiosActions'

import { Message, MessageSpec } from './types/model/message'
import { Channel, ChannelSpec } from './types/model/channel'
import { Identity, IdentitySpec } from './types/model/identity'

/*===============================================
=            Action Type Definitions            =
===============================================*/

/*----------  Holochain actions  ----------*/

export const CreateCustomChannel = createHolochainAsyncAction<ChannelSpec, string>('holo-chat', 'custom_channel', 'createCustomChannel')

export const AddMembers = createHolochainAsyncAction<{channelHash: string, members: Array<string>}, boolean>('holo-chat', 'custom_channel', 'addMembers')

export const GetMyChannels = createHolochainAsyncAction<any, Array<Channel>>('holo-chat', 'custom_channel', 'getMyChannels')

export const GetMembers = createHolochainAsyncAction<{channelHash: string}, Array<Identity>>('holo-chat', 'custom_channel', 'getMembers')

export const PostMessage = createHolochainAsyncAction<{channelHash: string, message: MessageSpec}, string>('holo-chat', 'custom_channel', 'postMessage')

export const GetMessages = createHolochainAsyncAction<{channelHash: string}, Array<Message>>('holo-chat', 'custom_channel', 'getMessages')

export const Whoami = createHolochainAsyncAction<any, string>('holo-chat', 'users', 'whoami')

export const GetIdentity = createHolochainAsyncAction<string, Identity>('holo-chat', 'users', 'getIdentity')

export const SetIdentity = createHolochainAsyncAction<IdentitySpec, boolean>('holo-chat', 'users', 'setIdentity')

export const GetUsers = createHolochainAsyncAction<any, Array<Identity>>('holo-chat', 'users', 'getUsers')

/*----------  Non-holochain actions  ----------*/

export const SetActiveChannel = createAction('holochat/setActiveChannel', resolve => {
  return (channel: Channel) => resolve(channel)
})

/*=====  End of Action Type Definitions  ======*/
