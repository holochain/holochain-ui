
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import holoVault from './cells/holo-vault/reducer'
import holoChat from './cells/holo-chat/reducer'
import errand from './cells/errand/reducer'
import promiseMiddleware from 'redux-promise-middleware'

let rootReducer = combineReducers({ holoVault: holoVault, holoChat: holoChat, errand: errand, form: formReducer })

const middleware = [promiseMiddleware()]

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
