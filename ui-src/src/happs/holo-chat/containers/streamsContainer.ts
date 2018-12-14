
import { connect } from 'react-redux'
import Streams, { OwnProps, StateProps, DispatchProps } from '../components/streams/streams'
import { Dispatch } from 'redux'
// import * as constants from '../constants'

import {
  Init,
	GetMyStreams,
	GetSubjects,
	CreateStream,
  GetAllMembers,
  SetStreamAddress,
  SetSubjectAddress
} from '../actions'

import { StreamSpec } from '../types/model/stream'

const mapStateToProps = (state: any): StateProps => {
  return {
    streams: state.holoChat.myStreams,
    subjects: state.holoChat.subjects
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    init: () => dispatch(Init.create({})),
    getAllMembers: () => dispatch(GetAllMembers.create({})),
  	getMyStreams: () => dispatch(GetMyStreams.create({})),
    getSubjects: (streamAddress: string) => dispatch(GetSubjects.create({ stream_address: streamAddress })),
  	newStream: (streamSpec: StreamSpec) => dispatch(CreateStream.create(streamSpec)),
    setStreamAddress: (streamAddress: String) => dispatch(SetStreamAddress(streamAddress)),
    setSubjectAddress: (subjectAddress: String) => dispatch(SetSubjectAddress(subjectAddress))
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Streams)
