import { createAction, createAsyncAction } from 'typesafe-actions'
// import { Channel } from './types/channel'
import { Message } from './types/model/message'
import { Channel } from './types/model/channel'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

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


/*===============================================
=            Action Type Definitions            =
===============================================*/

// TODO: Add more specific typing on the return types

export const CreateCustomChannel = createAsyncAction(
	'holochat/createCustomChannel',
	'holochat/createCustomChannel_SUCCESS',
	'holochat/createCustomChannel_FAILURE')
<BridgeCallPayload<{members: Array<string>}>, BridgeCallResponse<string>, AxiosError>()
// <calling payload type, success response type, error response type>S

export const AddMembers = createAsyncAction(
	'holochat/addMembers',
	'holochat/addMembers_SUCCESS',
	'holochat/addMembers_FAILURE')
<BridgeCallPayload<{members: Array<string>}>, BridgeCallResponse<boolean>, AxiosError>()

export const GetMyChannels = createAsyncAction(
	'holochat/getMyChannels', 
	'holochat/getMyChannels_SUCCESS', 
	'holochat/getMyChannels_FAILURE')
<BridgeCallPayload<{}>, BridgeCallResponse<Array<Channel>>, AxiosError>()

export const GetMembers = createAsyncAction(
	'holochat/getMembers', 
	'holochat/getMembers_SUCCESS', 
	'holochat/getMembers_FAILURE')
<BridgeCallPayload<{uuid: string}>, BridgeCallResponse<Array<string>>, AxiosError>()

export const PostMessage = createAsyncAction(
	'holochat/postMessage', 
	'holochat/postMessage_SUCCESS', 
	'holochat/postMessage_FAILURE')
<BridgeCallPayload<Message>, BridgeCallResponse<string>, AxiosError>()

export const GetMessages = createAsyncAction(
	'holochat/getMessages', 
	'holochat/getMessages_SUCCESS', 
	'holochat/getMessages_FAILURE')
<BridgeCallPayload<{uuid: string}>, BridgeCallResponse<Array<Message>>, AxiosError>()


export const SetActiveChannel = createAction('holochat/setActiveChannel', resolve => {
  return (channel: Channel) => resolve(channel);
});


/*=====  End of Action Type Definitions  ======*/


/*================================================
=            Action Creator Functions            =
================================================*/

export const createCustomChannel = (members: Array<string>) => {
	return CreateCustomChannel.request(makeBridgeCallPayload('holo-chat', 'custom_channel', 'createCustomChannel', {members}))
}

export const addMembers = (members: Array<string>) => {
	return AddMembers.request(makeBridgeCallPayload('holo-chat', 'custom_channel', 'addMembers', {members}))
}

export const getMyChannels = () => {
	return GetMyChannels.request(makeBridgeCallPayload('holo-chat', 'custom_channel', 'getMyChannels', {}))
}

export const getmembers = (uuid: string) => {
	return GetMembers.request(makeBridgeCallPayload('holo-chat', 'custom_channel', 'getMembers', {uuid}))
}

export const postMessage = (message: Message) => {
	return GetMessages.request(makeBridgeCallPayload('holo-chat', 'custom_channel', 'postMessage', message))
}

export const getMessages = (uuid: string) => {
	return GetMessages.request(makeBridgeCallPayload('holo-chat', 'custom_channel', 'getMessages', {uuid}))
}

/*=====  End of Action Creator Functions  ======*/





