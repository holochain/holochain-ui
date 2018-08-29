
import { connect } from 'react-redux'
import Setp from '../components/setup/setup'
import { Dispatch } from 'redux'
import {HoloChatState} from '../reducer'

// import  * as constants from '../constants'
// import {
//   messagesList
// } from '../actions'

const mapStateToProps = (state: HoloChatState) => {
  return {
    // messages: []
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // saveProfileSpec: () => {
    //   dispatch(messagesList())
    // }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setp)
