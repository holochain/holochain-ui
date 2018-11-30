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
    `${happ}/${zome}/${capability}/${func}`,
    `${happ}/${zome}/${capability}/${func}_SUCCESS`,
    `${happ}/${zome}/${capability}/${func}_FAILURE`)
  <ParamType, ReturnType, String>()

  const newAction = action as (typeof action & {
    create: (param: ParamType) => any,
    sig: (param: ParamType) => Promise<{payload: ReturnType}>
  })

  newAction.create = (params: ParamType) => async (dispatch: Dispatch): Promise<Action> => {
    try {
      const { call } = await connect(url)
      const result = await call(happ, zome, capability, func)(params)
      return dispatch(action.success(result))
    } catch {
      return dispatch(action.failure(`failed to call ${func}`))
    }
  }
  return newAction
}
