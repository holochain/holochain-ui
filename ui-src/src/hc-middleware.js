import axios from 'axios'

export function requestSendingMiddleware (store) {
  return next => action => {
    const { payload, meta, type } = action
    // if its a network request
    // fire an action that indicates the request has
    // been sent
    if (payload && payload.then) {
      const requestSendingAction = {
        payload: null,
        type: type + 'Sent',
        meta
      }
      store.dispatch(requestSendingAction)
    }
    return next(action)
  }
}

export function send(namespace, fnName, data) {
  var bridgeCall = {}
  bridgeCall.channel = data.channel
  bridgeCall.zome = namespace
  bridgeCall.function = fnName
  bridgeCall.data = data
  const stringified = JSON.stringify(bridgeCall)
  console.log(stringified)
  return axios.post(`/fn/holochain/callBridgedFunction`, stringified).then(res => {
    if (typeof res.data === "string" && res.data.indexOf("Error") > -1) {
      return Promise.reject(new Error(res.data))
    }
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

export function hcMiddleware (store) {
    return next => action => {
        const { type, meta } = action
        if (!(meta && meta.isHc)) return next(action)
        // the rest will be handled by redux-promises
        let sendRequest = send(meta.namespace, type, meta.data)
        sendRequest = meta.then ? sendRequest.then(meta.then) : sendRequest
        const newAction = Object.assign({},
          action,
          {
            payload: sendRequest
          },
          {
            meta: Object.assign({}, meta, { isHc: false })
          }
        )
        return next(newAction)
    }
}
