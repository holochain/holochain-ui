import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
// import { reducer as formReducer } from 'redux-form'

import { holochainMiddleware } from '@holochain/hc-redux-middleware'
import { connect } from './utils/hc-web-client'

import holoVault from './cells/holo-vault/reducer'
import holoChat from './cells/holo-chat/reducer'
import errand from './cells/errand/reducer'

let rootReducer = combineReducers({ holoVault: holoVault, holoChat: holoChat, errand: errand })

// put middleware in this array to have it applied
const middleware: Array<any> = [holochainMiddleware(connect('ws://localhost:3400'))]

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
