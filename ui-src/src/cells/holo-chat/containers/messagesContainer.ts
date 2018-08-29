
import { connect } from 'react-redux'
import Messages from '../components/messages/messages'
import  * as constants from '../constants'
import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'
import {
  messagesList
} from '../actions'

const mapStateToProps = (state: HoloChatState) => {
  return {
    messages: constants.messages
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    messagesList: () => {
      dispatch(messagesList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
