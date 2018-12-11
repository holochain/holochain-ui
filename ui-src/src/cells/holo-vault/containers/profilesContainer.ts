
import { connect } from 'react-redux'
import Personas, { OwnProps, StateProps, DispatchProps } from '../components/profile/profiles'
import { Dispatch } from 'redux'

import {
  GetProfiles
} from '../actions'

const mapStateToProps = (state: any): StateProps => {
  return {
    profiles: state.holoVault.profile.profiles
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getProfiles: () => dispatch(GetProfiles.create({}))
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Personas)
