import { connect } from 'react-redux'
import NewChannel from '../components/channels/newChannel'
import { Dispatch } from 'redux'
import {
	GetAllMembers,
	CreateChannel
} from '../actions'
import { ChannelSpec } from '../types/model/channel'

const mapStateToProps = (state: any) => {
  return {
    members: state.holoChat.members
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getAllMembers: () => dispatch(GetAllMembers.create({})),
    createChannel: (channelSpec: ChannelSpec) => dispatch(CreateChannel.create(channelSpec))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannel)
