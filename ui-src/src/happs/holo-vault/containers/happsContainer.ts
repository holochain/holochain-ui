import { connect } from 'react-redux'
import Happs from '../components/hApps/hApps'
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
