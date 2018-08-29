import { combineReducers } from 'redux'

import * as A from './actions'

// TODO: Redux state and action types are placeholders. Figure out the best possible way to do this

export interface HoloChatState {
  
}

const initialState: HoloChatState = {
  
}

function holochatReducer (state = initialState, action: A.Actions) {
  const { type, payload } = action
  switch (type) {
    case A.MESSAGESLIST:
        return {
          ...state,
          hash: payload
        }
    default:
      return state
  }
}

export default combineReducers({
  holochat: holochatReducer
})
