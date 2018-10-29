// @ts-ignore
import { Client } from 'rpc-websockets'

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
