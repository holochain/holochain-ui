import { connect } from 'react-redux'
import Happs from '../components/happs/happs'
import * as installedHapps from '../../../hApps/installed'

const mapStateToProps = () => {
  return {
    happs: installedHapps
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Happs)
