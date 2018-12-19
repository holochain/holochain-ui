import { connect } from 'react-redux'
import NewStream from '../components/streams/newStream'
import { Dispatch } from 'redux'
import {
	GetAllMembers,
	CreateStream
} from '../actions'
import { StreamSpec } from '../types/model/stream'

const mapStateToProps = (state: any) => {
  return {
    members: state.holoChat.members
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getAllMembers: () => dispatch(GetAllMembers.create({})),
    createStream: (streamSpec: StreamSpec) => dispatch(CreateStream.create(streamSpec))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewStream)
