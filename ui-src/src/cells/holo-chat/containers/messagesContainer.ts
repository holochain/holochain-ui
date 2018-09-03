
import { connect } from 'react-redux'
import Messages from '../components/messages/messages'
import  * as constants from '../constants'
import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'


const mapStateToProps = (state: HoloChatState) => {
  return {
    messages: constants.messages
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
