
import { connect } from 'react-redux'
import Errand from '../components/errand/errand.js'

import {
  getBoardState
} from '../actions'

const mapStateToProps = state => {
  return {
    state : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBoardState: () => {
      dispatch(getBoardState())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Errand)
