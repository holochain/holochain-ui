import { createAction, createAsyncAction } from 'typesafe-actions'

// import { Channel } from './types/channel'
import { Message, MessageSpec } from './types/model/message'
import { Channel, ChannelSpec } from './types/model/channel'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Identity, IdentitySpec } from './types/model/identity'
/*
Typed action creators. See (https://github.com/piotrwitek/typesafe-actions#createaction) for details

This method allows for defining arbitraty function as action creators that also have their own types!
In the reducer it is possible to switch on the type of the action, no constants required

The arguments to resolve will be assigned to payload and meta respectively.
The type of the action will be automatically set
*/


//TODO: Refactor to another file for reusability

interface BridgeCallPayload<PayloadType> {
	request: AxiosRequestConfig & {
		data: {
			channel: string,
			zome: string,
			func: string,
			data: PayloadType
		}
	}
}

type BridgeCallResponse<ResponseType> = AxiosResponse<ResponseType>

function makeBridgeCallPayload<PayloadType>(channel: string, zome: string, func: string, data: PayloadType): BridgeCallPayload<PayloadType> {
	return {
		request: {
			data: {
				channel,
				zome,
				func,
				data
			}	
		}
	}
}

function createHolochainAsyncAction<paramType, returnType>(channel: string, zome: string, func: string) {
	const action = createAsyncAction(
		`${channel}/${zome}/${func}`,
		`${channel}/${zome}/${func}_SUCCESS`,
		`${channel}/${zome}/${func}_FAILURE`)
	<BridgeCallPayload<paramType>, BridgeCallResponse<returnType>, AxiosError>()

	const newAction = action as (typeof action & {create: (param: paramType) => any})
	newAction.create = (param: paramType) => action.request(makeBridgeCallPayload(channel, zome, func, param));
	return newAction
}


/*===============================================
=            Action Type Definitions            =
===============================================*/

/*----------  Holochain actions  ----------*/


export const CreateCustomChannel = createHolochainAsyncAction<ChannelSpec, string>('holo-chat', 'custom_channel', 'createCustomChannel')

export const AddMembers = createHolochainAsyncAction<{channelHash: string, members: Array<string>}, boolean>('holo-chat', 'custom_channel', 'addMembers')

export const GetMyChannels = createHolochainAsyncAction<{}, Array<Channel>>('holo-chat', 'custom_channel', 'getMyChannels')

export const GetMembers = createHolochainAsyncAction<{channelHash: string}, Array<Identity>>('holo-chat', 'custom_channel', 'getMembers')

export const PostMessage = createHolochainAsyncAction<{channelHash: string, message: MessageSpec}, string>('holo-chat', 'custom_channel', 'postMessage')

export const GetMessages = createHolochainAsyncAction<{channelHash: string}, Array<Message>>('holo-chat', 'custom_channel', 'getMessages')

export const Whoami = createHolochainAsyncAction<{}, string>('holo-chat', 'users', 'whoami')

export const GetIdentity = createHolochainAsyncAction<string, Identity>('holo-chat', 'users', 'getIdentity')

export const SetIdentity = createHolochainAsyncAction<IdentitySpec, boolean>('holo-chat', 'users', 'setIdentity')

export const GetUsers = createHolochainAsyncAction<{}, Array<Identity>>('holo-chat', 'users', 'getUsers')


/*----------  Non-holochain actions  ----------*/

export const SetActiveChannel = createAction('holochat/setActiveChannel', resolve => {
  return (channel: Channel) => resolve(channel);
});


/*=====  End of Action Type Definitions  ======*/
