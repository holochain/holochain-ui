import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import holoVault from './cells/holo-vault/reducer'
import holoChat from './cells/holo-chat/reducer'
// @ts-ignore
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import errand from './cells/errand/reducer'

const holochainClient = axios.create({
  baseURL: '/call',
  method: 'POST'
})

let rootReducer = combineReducers({ holoVault: holoVault, holoChat: holoChat, errand: errand, form: formReducer })

const middleware = [axiosMiddleware(holochainClient)]

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function CreateStore () {
  return createStore(
  	rootReducer,
  	composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
}

export default CreateStore
