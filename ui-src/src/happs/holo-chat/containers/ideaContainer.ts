
import { connect } from 'react-redux'
import IdeaCard from '../components/cards/ideaCard'
import * as constants from '../constants'
import { HoloChatState } from '../reducer'
import { Dispatch } from 'redux'
import { addCard } from '../../errand/actions'
import {
} from '../actions'

// declare function addCard(card_info: any, lane_id: any): AnyAction

const mapStateToProps = (state: HoloChatState) => {
  return {
    messages: constants.messages
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addCard: (cardInfo: any, laneId: string) => {
      dispatch(addCard(cardInfo, laneId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdeaCard)
