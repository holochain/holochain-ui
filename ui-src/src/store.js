
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import holoVault from './cells/holo-vault/reducer'
import holoChat from './cells/holo-chat/reducer'
import axiosMiddleware from 'redux-axios-middleware'
import promiseMiddleware from 'redux-promise'
import axios from 'axios';
import errand from './cells/errand/reducer'
import { requestSendingMiddleware, hcMiddleware } from './hc-middleware'

const holochainClient = axios.create({
		baseURL: '/fn/holochain/callBridgedFunction',
  	method: 'POST',
    transformRequest: [
      function(data, headers) {
        return JSON.stringify(data)
      }
    ]
  })


let rootReducer = combineReducers({holoVault: holoVault, holoChat: holoChat, errand: errand, form: formReducer})

const middleware = [axiosMiddleware(holochainClient), hcMiddleware, requestSendingMiddleware, promiseMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function CreateStore() {
  return createStore(
  	rootReducer, 
  	composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
}


export default CreateStore;
