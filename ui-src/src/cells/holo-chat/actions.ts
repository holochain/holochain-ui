import { createAction } from 'typesafe-actions'
import { AxiosRequestConfig } from 'axios'


// TODO: refactor to another file to share between cells
function makeBridgeReqestPayload(channel: string, zome: string, func: string, data: any): {request: AxiosRequestConfig} {
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




/*
Typed action creators. See (https://github.com/piotrwitek/typesafe-actions#createaction) for details

This method allows for defining arbitraty function as action creators that also have their own types!
In the reducer it is possible to switch on the type of the action, no constants required

The arguments to resolve will be assigned to payload and meta respectively.
The type of the action will be automatically set
*/

export const createCustomChannel = createAction('holochat/createCustomChannel', resolve => {
	return (members: Array<string>) => {
		return resolve(makeBridgeReqestPayload('holo-chat', 'custom_channel', 'createCustomChannel', {members}));
	}
})

export const addMembers = createAction('holochat/addMembers', resolve => {
	return (uuid: string, members: Array<string>) => {
		return resolve(makeBridgeReqestPayload('holo-chat', 'custom_channel', 'addMembers', {uuid, members}));
	}
})

export const getMyChannels = createAction('holochat/getMyChannels', resolve => {
	return () => {
		return resolve(makeBridgeReqestPayload('holo-chat', 'custom_channel', 'getMyChannels', {}));
	}
})



