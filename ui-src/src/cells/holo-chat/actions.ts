import { createAsyncAction } from 'typesafe-actions'
import { Channel } from './types/channel'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

/*
Typed action creators. See (https://github.com/piotrwitek/typesafe-actions#createaction) for details

This method allows for defining arbitraty function as action creators that also have their own types!
In the reducer it is possible to switch on the type of the action, no constants required

The arguments to resolve will be assigned to payload and meta respectively.
The type of the action will be automatically set
*/


//TODO: Refactor to another file for reusability

interface BridgeCallPayload {
	request: AxiosRequestConfig
}

function makeBridgeCallPayload(channel: string, zome: string, func: string, data: any): BridgeCallPayload {
	return {
		request: {
			url: '/',
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
<BridgeCallPayload, AxiosResponse, AxiosError>()
// <calling payload type, success response type, error response type>S


export const addMembers = createAsyncAction(
	'holochat/addMembers',
	'holochat/addMembers_SUCCESS',
	'holochat/addMembers_FAILURE')
<BridgeCallPayload, AxiosResponse, AxiosError>()


export const getMyChannels = createAsyncAction(
	'holochat/getMyChannels', 
	'holochat/getMyChannels_SUCCESS', 
	'holochat/getMyChannels_FAILURE')
<void, AxiosResponse, AxiosError>()


/*=====  End of Action Type Definitions  ======*/


/*================================================
=            Action Creator Functions            =
================================================*/

export const createCustomChannel = (members: Array<string>) => {
	return CreateCustomChannel.request(makeBridgeCallPayload('holo-chat', 'custom_channel', 'createCustomChannel', {members}))
}

/*=====  End of Action Creator Functions  ======*/





