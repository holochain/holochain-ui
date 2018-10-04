import { createAsyncAction } from 'typesafe-actions'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
/*
Typed action creators. See (https://github.com/piotrwitek/typesafe-actions#createaction) for details

This method allows for defining arbitraty function as action creators that also have their own types!
In the reducer it is possible to switch on the type of the action, no constants required

The arguments to resolve will be assigned to payload and meta respectively.
The type of the action will be automatically set
*/

export interface BridgeCallPayload<PayloadType> {
  request: AxiosRequestConfig & {
    data: {
      channel: string,
      zome: string,
      func: string,
      data: PayloadType
    }
  }
}

export type BridgeCallResponse<ResponseType> = AxiosResponse<ResponseType>

function makeBridgeCallPayload<PayloadType> (channel: string, zome: string, func: string, data: PayloadType): BridgeCallPayload<PayloadType> {
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

export function createHolochainAsyncAction<paramType, returnType> (channel: string, zome: string, func: string) {
  const action = createAsyncAction(
		`${channel}/${zome}/${func}`,
		`${channel}/${zome}/${func}_SUCCESS`,
		`${channel}/${zome}/${func}_FAILURE`)
	<BridgeCallPayload<paramType>, BridgeCallResponse<returnType>, AxiosError>()

  const newAction = action as (typeof action & {
    create: (param: paramType) => any,
    sig: (param: paramType) => Promise<{payload: BridgeCallResponse<returnType>}>
  })
  newAction.create = (param: paramType) => action.request(makeBridgeCallPayload(channel, zome, func, param))
  return newAction
}
