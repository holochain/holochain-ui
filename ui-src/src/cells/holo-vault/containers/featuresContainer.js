
import { connect } from 'react-redux'
import Features from '../components/feature/features'
import  * as constants from '../constants.js'
import {
  cellsList
} from '../actions'

const mapStateToProps = state => {
  return {
    features: [constants.feature1, constants.feature2, constants.feature3, constants.feature4]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cellsList: (mapping) => {
      dispatch(cellsList(mapping))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Features)
