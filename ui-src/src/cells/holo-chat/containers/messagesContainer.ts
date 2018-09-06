
import { connect } from 'react-redux'
import Messages from '../components/messages/messages'
// import  * as constants from '../constants'
// import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'
import {modelMessagesToViewMessages} from '../types/view/message'
import {Message} from '../types/model/message'
import {
	getMessages,
	getMembers,
	whoami,
	postMessage
} from '../actions'

const mapStateToProps = (state: any) => {
  return {
    messages: modelMessagesToViewMessages(state.holoChat.currentMessages, state.holoChat.activeChannelMembers, state.holoChat.myHash),
    channel: state.holoChat.activeChannel,
    members: state.holoChat.activeChannelMembers,
    myHash: state.holoChat.myHash
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		getMessages: (channelUUID: string) => dispatch(getMessages(channelUUID)),
		getMembers:  (channelUUID: string) => dispatch(getMembers(channelUUID)),
		whoami: () => dispatch(whoami()),
		sendMessage: (message: Message) => dispatch(postMessage(message))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
