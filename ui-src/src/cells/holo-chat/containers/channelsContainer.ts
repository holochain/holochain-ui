
import { connect } from 'react-redux'
import Channels from '../components/channels/channels'
import channelData from '../data/channels.json'
import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'
import {

} from '../actions'

const mapStateToProps = (state: HoloChatState) => {
  return {
    channels: channelData
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
