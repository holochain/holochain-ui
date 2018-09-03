
import { connect } from 'react-redux'
import IdeaCard from '../components/ideaCard/ideaCard'
import  * as constants from '../constants'
import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'
import {
} from '../actions'

const mapStateToProps = (state: HoloChatState) => {
  return {
    messages: constants.messages
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdeaCard)
