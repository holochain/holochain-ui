import { AnyAction } from 'redux'
import { createAsyncAction } from 'typesafe-actions'

/**
 *
 * Function that creates action creators for holochain calls
 * The actions it creates are thunks rather than traditional actions
 * so the redux-thunk middleware must be applied.
 *
 */
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
  <ParamType, ReturnType, Error>()

  const newAction = action as (typeof action & {
    create: (param: ParamType) => any,
    sig: (param: ParamType) => Promise<{payload: ReturnType}>
  })

  // the action creators that are produced
  newAction.create = (params: ParamType): AnyAction => {
    return {
      type: `${happ}/${zome}/${capability}/${func}`,
      meta: {
        holochainAction: true
      },
      payload: params
    }
  }

  return newAction
}
