import { connect } from 'react-redux'
import NewChannel from '../components/channels/newChannel'
import {Dispatch} from 'redux'
import {
	createCustomChannel,
} from '../actions'
import {ChannelSpec} from '../types/model/channel'


const mapStateToProps = (state: any) => {
  return {
    users: state.holoChat.users
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createChannel: (channelSpec: ChannelSpec) => { dispatch( createCustomChannel(channelSpec) )}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannel)
