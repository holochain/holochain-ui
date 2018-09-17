import { connect } from 'react-redux'
import NewChannel from '../components/channels/newChannel'
import {Dispatch} from 'redux'

const mapStateToProps = (state: any) => {
  return {
    users: state.holoChat.users
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannel)
