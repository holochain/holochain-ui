
import { connect } from 'react-redux'
import Personas, { OwnProps, StateProps, DispatchProps } from '../components/profile/profile'
import { Dispatch } from 'redux'
import { Profile, ProfileField } from '../types/profile'

import {
  CreateMapping
} from '../actions'

const mapStateToProps = (state: any): StateProps => {

  // use the route to filter profiles to get the selected profile

  return {
    personas: state.holoVault.profile.personas,
    profile: null
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    save: (profile: Profile) => {
      Promise.all(
        profile.fields.map((field: ProfileField) => {
          //
          dispatch(CreateMapping.create(field.mapping))
        })
      )
    }
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Personas)
