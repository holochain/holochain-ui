
import { connect } from 'react-redux'
import Messages from '../components/messages/messages'
// import  * as constants from '../constants'
// import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'
import {modelMessagesToViewMessages} from '../types/view/message'
import {
	getMessages,
	getMembers
} from '../actions'

const mapStateToProps = (state: any) => {
  return {
    messages: modelMessagesToViewMessages(state.holoChat.currentMessages, state.holoChat.activeChannelMembers),
    channel: state.holoChat.activeChannel,
    members: state.holoChat.activeChannelMembers
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		getMessages: (channelUUID: string) => dispatch(getMessages(channelUUID)),
		getMembers:  (channelUUID: string) => dispatch(getMembers(channelUUID))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
