
import { connect } from './hc-web-client'

export const holochain = (url) => store => {
	// stuff here has the same life as the store!
	// this is how we persist a websocket connection

	const connectPromise = connect(url).then(({call}) => {
		store.dispatch({type: 'HOLOCHAIN_WEBSOCKET_CONNECTED', payload: url})
		return call
	})

	return next => action => {
		if (action.meta && action.meta.holochainAction) {
			next(action) // resend the original action so the UI can change based on requests

			return connectPromise.then((call) => {
				return call(action.type)(action.payload)
				.then((stringResult) => {
					const result = JSON.parse(stringResult)
					return store.dispatch({type: action.type+'_SUCCESS', payload: result})
				})
				.catch((err) => {
	  				return store.dispatch({type: action.type+'_FAILURE', payload: err.toString()})
				})
			})
		} else {
			return next(action)
		}
	}

} 
