// @ts-ignore
import { Client } from 'rpc-websockets'

export const connect = (url: string): any => new Promise((fulfill, reject) => {
  const ws = new Client(url)
  ws.on('open', () => {
    const call = (...segments: Array<string>) => (params: any) => {
      const method = segments.length === 1 ? segments[0] : segments.join('/')
      return ws.call(method, params)
    }
    const close = () => ws.close()
    fulfill({ call, close, ws })
  })
})

export function getInstance (info: Array<{dna: string, agent: string, id: string}>, dna: string, agent: string): string | null {
  for (let entry of info) {
  	if (entry.dna === dna && entry.agent === agent) {
  		return entry.id
  	}
  }
  return null
}
