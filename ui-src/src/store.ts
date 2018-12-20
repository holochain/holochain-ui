import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
// import { reducer as formReducer } from 'redux-form'

import { holochainMiddleware } from '@holochain/hc-redux-middleware'
import { connect } from '@holochain/hc-web-client'

import holoVault from './hApps/holo-vault/reducer'
import holoChat from './hApps/holo-chat/reducer'
// import errand from './hApps/errand/reducer'

let rootReducer = combineReducers({ holoVault: holoVault, holoChat: holoChat })

// put middleware in this array to have it applied
const middleware: Array<any> = [holochainMiddleware(connect(`ws://localhost:3400`))]

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
