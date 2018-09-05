
import { connect } from 'react-redux'
import Channels from '../components/channels/channels'
// import channelData from '../data/channels.json'
import {HoloChatState} from '../reducer'
import {getMyChannels} from '../actions'
import {Dispatch} from 'redux'
import {
} from '../actions'

const mapStateToProps = (state: HoloChatState) => {
  return {
    channels: state.myChannels
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  	getMyChannels: dispatch(getMyChannels())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
