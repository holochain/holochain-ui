
import { connect } from 'react-redux'
import Channels from '../components/channels/channels'
// import channelData from '../data/channels.json'
// import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'
import {
	getMyChannels,
	createCustomChannel
} from '../actions'



// TODO: Add proper typing to the global state and figure out why holochat is two levels deep
const mapStateToProps = (state: any) => {
  return {
    channels: state.holoChat.myChannels
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  	getMyChannels: () => { dispatch(getMyChannels()) },
  	newChannel: () => { dispatch(createCustomChannel([])) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
