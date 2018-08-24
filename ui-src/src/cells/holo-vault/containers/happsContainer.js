
import { connect } from 'react-redux'
import Happs from '../components/happs/happs'
import  * as installedHapps from '../../../happs/installed.js'
import {
  cellsList
} from '../actions'

const mapStateToProps = state => {
  return {
    happs: installedHapps
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
)(Happs)
