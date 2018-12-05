
import { connect } from 'react-redux'
import Messages, { Props, StateProps, RouterProps, DispatchProps } from '../components/messages/messages'
import { Dispatch } from 'redux'
import { modelMessagesToViewMessages } from '../types/view/message'
import { MessageSpec } from '../types/model/message'
import {
	GetMessages,
	PostMessage
} from '../actions'

const mapStateToProps = (state: any, props: Props & RouterProps): StateProps => {
  const channelAddress = props.match.params.channel
  const subjectAddress = props.match.params.subject

  console.log(channelAddress)
  return {
    messages: modelMessagesToViewMessages(state.holoChat.currentMessages, state.holoChat.activeChannelMembers, state.holoChat.myHash),
    channelAddress: channelAddress,
    subjectAddress: subjectAddress
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getMessages: (channelSubjectAddress: string) => dispatch(GetMessages.create({ address: channelSubjectAddress })),
    sendMessage: (payload: {message: MessageSpec, channel_address: string, subjects: [string]}) => dispatch(PostMessage.create(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
