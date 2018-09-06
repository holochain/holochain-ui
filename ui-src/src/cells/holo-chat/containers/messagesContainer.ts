
import { connect } from 'react-redux'
import Messages from '../components/messages/messages'
// import  * as constants from '../constants'
// import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'
import {modelMessagesToViewMessages} from '../types/view/message'
import {
	getMessages
} from '../actions'

const mapStateToProps = (state: any) => {
  return {
    messages: modelMessagesToViewMessages(state.holoChat.currentMessages),
    channel: state.holoChat.activeChannel
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		getMessages: (channelUUID: string) => dispatch(getMessages(channelUUID))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
