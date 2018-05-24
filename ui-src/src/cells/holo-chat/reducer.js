import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as A from './actions'

const initialState = {
}

function holochatReducer (state = initialState, action) {
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
