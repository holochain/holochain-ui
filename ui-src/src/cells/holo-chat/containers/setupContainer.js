
import { connect } from 'react-redux'
import Setp from '../components/setup/setup'
// import  * as constants from '../constants'
// import {
//   messagesList
// } from '../actions'

const mapStateToProps = state => {
  return {
    // messages: []
  }
}

const mapDispatchToProps = (dispatch) => {
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
