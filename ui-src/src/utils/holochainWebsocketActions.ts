// @ts-ignore
import { Client } from 'rpc-websockets'
import { createAsyncAction } from 'typesafe-actions'

export const connect = (url: string) => new Promise((fulfill, reject) => {
  const ws = new Client(url)
  ws.on('open', () => {
    const call = (dnaHash: string, zome: string, capability: string, func: string) => (params: any) => {
      return ws.call(`${dnaHash}/${zome}/${capability}/${func}`, params)
    }
    const close = ws.close
    fulfill({ call, close, ws })
  })
})

export function createHolochainAsyncAction<paramType, returnType> (dnaHash: string, zome: string, capability: string, func: string) {
  const action = createAsyncAction(
    `${dnaHash}/${zome}/${func}`,
    `${dnaHash}/${zome}/${func}_FULFILLED`,
    `${dnaHash}/${zome}/${func}_REJECTED`)
  <Promise<returnType>, returnType, Error>()

  const newAction = action as (typeof action & {
    create: (param: paramType) => any
    sig: (param: paramType) => Promise<{payload: returnType}>
  })
  newAction.create = (param: paramType) => action.request(
    connect('ws://localhost:4000/').then(({ call }) => {
      return call(dnaHash, zome, capability, func)(param)
    })
  )
  return newAction
}
