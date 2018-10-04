
import { connect } from 'react-redux'
import PresenceArcs from '../components/presence/presenceArcs'
import { HoloChatState } from '../reducer'
import { Dispatch } from 'redux'
import presenceData from '../data/presence_philip_micah.json'
import {
} from '../actions'

// declare function addCard(card_info: any, lane_id: any): AnyAction

const mapStateToProps = (state: HoloChatState) => {
  return {
    arcs: presenceData,
    strokeWidth: 10
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // addCard: (card_info: any, lane_id: string) => {
    //   dispatch(addCard(card_info, lane_id))
    // }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresenceArcs)
