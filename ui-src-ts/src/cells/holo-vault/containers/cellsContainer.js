
import { connect } from 'react-redux'
import Cells from '../components/cell/cells'
import  * as constants from '../constants.js'
import {
  cellsList
} from '../actions'

const mapStateToProps = state => {
  return {
    cells: [constants.cell1, constants.cell2, constants.cell3, constants.cell4, constants.cell5, constants.cell6]
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
)(Cells)
