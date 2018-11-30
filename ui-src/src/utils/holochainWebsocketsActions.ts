import { Action, Dispatch } from 'redux'
import { connect } from './hc-web-client'
import { createAsyncAction } from 'typesafe-actions'

// remove this later
const url = 'ws://localhost:3400'

export const createHolochainAsyncAction = <ParamType, ReturnType>(
  happ: string,
  zome: string,
  capability: string,
  func: string
) => {

  const action = createAsyncAction(
    `${happ}/${zome}/${capability}/${func}_REQUEST`,
    `${happ}/${zome}/${capability}/${func}_SUCCESS`,
    `${happ}/${zome}/${capability}/${func}_FAILURE`)
  <ParamType, ReturnType, Error>()

  const newAction = action as (typeof action & {
    create: (param: ParamType) => any,
    sig: (param: ParamType) => Promise<{payload: ReturnType}>
  })

  newAction.create = (params: ParamType) => async (dispatch: Dispatch): Promise<Action> => {
    // @ts-ignore
    dispatch(action.request(params)) // dispatch the action signifying a request
    try {
      const { call } = await connect(url)
      const stringResult = await call(happ, zome, capability, func)(params)
      const result = JSON.parse(stringResult)
      // @ts-ignore
      return dispatch(action.success(result)) // on success
    } catch (err) {
      // @ts-ignore
      return dispatch(action.failure(err)) // on failure
    }
  }

  return newAction
}
