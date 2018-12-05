import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'

import thunk from 'redux-thunk'
import { holochain } from './utils/hcMiddleware'

import holoVault from './cells/holo-vault/reducer'
import holoChat from './cells/holo-chat/reducer'
import errand from './cells/errand/reducer'

let rootReducer = combineReducers({ holoVault: holoVault, holoChat: holoChat, errand: errand, form: formReducer })

// put middleware in this array to have it applied
const middleware: Array<any> = [holochain('ws://localhost:3400'), thunk]

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
