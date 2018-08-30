
import { connect } from 'react-redux'
import Channels from '../components/channels/channels'
import  * as constants from '../constants'
import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'
import {
  channelsList
} from '../actions'

const mapStateToProps = (state: HoloChatState) => {
  return {
    messages: constants.messages
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    channelsList: () => {
      dispatch(channelsList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
