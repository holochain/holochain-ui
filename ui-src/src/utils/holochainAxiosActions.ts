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
      happ: string,
      zome: string,
      capability: string,
      func: string,
      data: PayloadType
    }
  }
}

export type BridgeCallResponse<ResponseType> = AxiosResponse<ResponseType>

function makeBridgeCallPayload<PayloadType> (happ: string, zome: string, capability: string, func: string, data: PayloadType): BridgeCallPayload<PayloadType> {
  return {
    request: {
      data: {
        happ,
        zome,
        capability,
        func,
        data
      }
    }
  }
}

export function createHolochainAsyncAction<paramType, returnType> (happ: string, zome: string, capability: string, func: string) {
  const action = createAsyncAction(
		`${happ}/${zome}/${func}`,
		`${happ}/${zome}/${func}_SUCCESS`,
		`${happ}/${zome}/${func}_FAILURE`)
	<BridgeCallPayload<paramType>, BridgeCallResponse<returnType>, AxiosError>()

  const newAction = action as (typeof action & {
    create: (param: paramType) => any,
    sig: (param: paramType) => Promise<{payload: BridgeCallResponse<returnType>}>
  })
  newAction.create = (param: paramType) => action.request(makeBridgeCallPayload(happ, zome, capability, func, param))
  return newAction
}
