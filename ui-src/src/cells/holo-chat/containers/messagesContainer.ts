
import { connect } from 'react-redux'
import Messages, { Props, StateProps, RouterProps, DispatchProps } from '../components/messages/messages'
import { Dispatch } from 'redux'
import { modelMessagesToViewMessages } from '../types/view/message'
import { MessageSpec } from '../types/model/message'
import {
	GetMessages,
	PostMessage
} from '../actions'

const mapStateToProps = (state: any, ownProps: Props & RouterProps): StateProps => {
  const channelAddress = ownProps.match.params.channel
  return {
    messages: modelMessagesToViewMessages(state.holoChat.currentMessages, state.holoChat.activeChannelMembers, state.holoChat.myHash),
    channelAddress: channelAddress
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getMessages: (channelSubjectAddress: string) => dispatch(GetMessages.create({ channelSubjectAddress: channelSubjectAddress })),
    sendMessage: (payload: {message: MessageSpec, channelAddress: string, subjects: [string]}) => dispatch(PostMessage.create(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
