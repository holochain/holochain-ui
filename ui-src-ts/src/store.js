import { compact } from 'lodash'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { applyMiddleware, compose, createStore } from 'redux'
import promiseMiddleware from 'redux-promise'
import { requestSendingMiddleware, hcMiddleware } from 'hc-redux-middleware'
import holoVault from './cells/holo-vault/reducer'
import holoChat from './cells/holo-chat/reducer'

const middleware = compact([
    hcMiddleware,
    requestSendingMiddleware,
    promiseMiddleware
])
let rootReducer = combineReducers({holoVault: holoVault, holoChat: holoChat, form: formReducer})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
function CreateStore() {
  return createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(...middleware)))
}

export default CreateStore;
