
import { connect } from 'react-redux'
import Messages, { Props, StateProps, RouterProps, DispatchProps } from '../components/messages/messages'
import { Dispatch } from 'redux'
import { Channel } from '../types/model/channel'
import { Subject } from '../types/model/subject'
import { MessageSpec } from '../types/model/message'
import {
	GetMessages,
	PostMessage
} from '../actions'

const mapStateToProps = (state: any, props: Props & RouterProps): StateProps => {
  const channelAddress = props.match.params.channel
  const subjectAddress = props.match.params.subject
  let channelName = ''
  let subjectName = ''
  const channelNames = state.holoChat.myChannels.filter(function (channel: Channel) {
	  return channel.address === channelAddress
  })
  if (channelNames.length > 0) {
    channelName = channelNames[0].name
  }
  const subjectNames = state.holoChat.subjects.filter(function (subject: Subject) {
    return subject.address === subjectAddress
  })
  if (subjectNames.length > 0) {
    subjectName = subjectNames[0].name
  }

  return {
    messages: state.holoChat.messages, // modelMessagesToViewMessages(state.holoChat.currentMessages, state.holoChat.activeChannelMembers, state.holoChat.myHash),
    members: state.holoChat.members,
    channelAddress: channelAddress,
    channelName: channelName,
    subjectAddress: subjectAddress,
    subjectName: subjectName
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
