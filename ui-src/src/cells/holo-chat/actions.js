export const MESSAGESLIST = 'messagesList'

export function messagesList() {
  return {
    type: MESSAGESLIST,
    meta: {
      isHc: true,
      namespace: 'messages'
    }
  }
}
