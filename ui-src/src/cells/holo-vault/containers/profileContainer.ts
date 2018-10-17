
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Profile as ProfileType, ProfileField } from '../types/profile'
import Profile, { Props, RouterProps, StateProps, DispatchProps, OwnProps } from '../components/profile/profile'

import {
  CreateMapping,
  GetProfiles,
  GetPersonas
} from '../actions'

const mapStateToProps = (state: any, ownProps: Props & RouterProps): StateProps => {

  // use the route to filter profiles to get the selected profile
  // will return undefined if non-existent

  const hash = ownProps.match.params.hash
  let profile: ProfileType = state.holoVault.profile.profiles.filter((profile: ProfileType) => {
    return profile.sourceDNA === hash
  })[0]

  return {
    personas: state.holoVault.profile.personas,
    profile: profile,
    profiles: state.holoVault.profile.profiles
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getProfiles: () => dispatch(GetProfiles.create(undefined)),
    getPersonas: () => dispatch(GetPersonas.create(undefined)),
    save: (profile: ProfileType) => {
      // call createMapping on all of the fields with a mapping
      console.log('About to map ', profile)
      return Promise.all(
        profile.fields.filter(field => field.mapping).map((field: ProfileField) => {
          console.log('creating map for ', field)
          return dispatch(CreateMapping.create({
            ...field.mapping!,
            retrieverDNA: profile.sourceDNA,
            profileFieldName: field.name
          }))
        })
      )
    }
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
