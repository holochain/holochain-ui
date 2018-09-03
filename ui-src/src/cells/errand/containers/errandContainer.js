
import { connect } from 'react-redux'
import Errand from '../components/errand/errand.js'

import {
  getBoardState,
  moveCard
} from '../actions'

const mapStateToProps = state => {
  return {
    boardData : state.errand
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBoardState: () => {
      dispatch(getBoardState())
    },
    moveCard: (cardId, sourceLaneId, targetLaneId) => {
      dispatch(moveCard(cardId, sourceLaneId, targetLaneId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Errand)
