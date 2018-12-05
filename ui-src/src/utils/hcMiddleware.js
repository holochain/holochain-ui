
import { connect } from './hc-web-client'

export const holochain = (url) => store => {
	// stuff here has the same life as the store!
	// this is how we persist a websocket connection
	let call = null

	connect(url).then((wsFunctions) => {
		store.dispatch({type: 'HOLOCHAIN_WEBSOCKET_CONNECTED', payload: url})
		call = wsFunctions.call
	})

	return next => action => {
		// send off the original action for debug
		next(action)

		if (action.meta && action.meta.holochainAction) {
			if(call) {
				return call(action.type)(action.payload)
				.then((stringResult) => {
					result = JSON.parse(stringResult)
					return store.dispatch({type: action.type+'_SUCCESS', payload: result})
				})
				.catch((err) => {
	  				return store.dispatch({type: action.type+'_FAILURE', payload: err})
				})
			} else {
	  			return new Promise(resolve => store.dispatch({type: action.type+'_FAILURE', payload: 'No connection available'}))			
			}
		}
	}

} 
