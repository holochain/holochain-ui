
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { applyMiddleware, createStore } from 'redux'
// import { requestSendingMiddleware, hcMiddleware } from './hc-middleware'
import holoVault from './cells/holo-vault/reducer'
import holoChat from './cells/holo-chat/reducer'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios';

const holochainClient = axios.create({
		baseURL: 'http://localhost:4141/fn/holochain/callBridgedFunction',
  	responseType: 'json',
  	method: 'POST'
})


let rootReducer = combineReducers({holoVault: holoVault, holoChat: holoChat, form: formReducer})

function CreateStore() {
  return createStore(
  	rootReducer, 
  	applyMiddleware(
  		axiosMiddleware(holochainClient)
  	)
  )
}

export default CreateStore;
