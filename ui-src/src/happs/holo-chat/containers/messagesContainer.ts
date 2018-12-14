
import { connect } from 'react-redux'
import Messages, { Props, StateProps, RouterProps, DispatchProps } from '../components/messages/messages'
import { Dispatch } from 'redux'
import { Stream } from '../types/model/stream'
import { Subject } from '../types/model/subject'
import { MessageSpec } from '../types/model/message'
import {
	GetMessages,
	PostMessage
} from '../actions'

const mapStateToProps = (state: any, props: Props & RouterProps): StateProps => {
  const streamAddress = props.match.params.stream

  console.log('streamAddress' + streamAddress)

  const subjectAddress = props.match.params.subject
  let streamName = ''
  let subjectName = ''
  const streamNames = state.holoChat.myStreams.filter(function (stream: Stream) {
	  return stream.address === streamAddress
  })
  if (streamNames.length > 0) {
    streamName = streamNames[0].name
  }
  const subjectNames = state.holoChat.subjects.filter(function (subject: Subject) {
    return subject.address === subjectAddress
  })
  if (subjectNames.length > 0) {
    subjectName = subjectNames[0].name
  }

  return {
    messages: state.holoChat.messages, // modelMessagesToViewMessages(state.holoChat.currentMessages, state.holoChat.activeStreamMembers, state.holoChat.myHash),
    members: state.holoChat.members,
    streamAddress: streamAddress,
    streamName: streamName,
    subjectAddress: subjectAddress,
    subjectName: subjectName
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getMessages: (streamSubjectAddress: string) => dispatch(GetMessages.create({ address: streamSubjectAddress })),
    sendMessage: (payload: {message: MessageSpec, stream_address: string, subjects: [string]}) => dispatch(PostMessage.create(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
