
import { connect } from 'react-redux'
import Channels from '../components/channels/channels'
// import channelData from '../data/channels.json'
// import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'
import {
	getMyChannels,
	createCustomChannel,
  SetActiveChannel
} from '../actions'
import {Channel} from '../types/model/channel'



// TODO: Add proper typing to the global state and figure out why holochat is two levels deep
const mapStateToProps = (state: any) => {
  return {
    channels: state.holoChat.myChannels
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  	getMyChannels: () => { dispatch(getMyChannels()) },
  	newChannel: () => { dispatch(createCustomChannel([])) }, //TODO: let this accept a channel spec object
    setActiveChannel: (channel: Channel) => { dispatch( SetActiveChannel(channel) )}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
