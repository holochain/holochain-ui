
import { connect } from 'react-redux'
import ProfileForm from '../components/profile/profile'
import {
  personaCreate,
  profileMappingCreate
} from '../actions'



const mapStateToProps = (state, ownProps) => {
  const profileName = ownProps.match.params.name
  let selectedProfile = state.holoVault.profile.profiles.filter(function (profile){
    return profileName === profile.name
  })[0]
  //use the mapping to find the values, combine the values with the spec
  if(selectedProfile.mapping !== undefined){
    selectedProfile.profileSpec.profile.forEach(function(profile){
      if(selectedProfile.mapping.profile[profile.appLabel] !== undefined){
        profile.personaField = selectedProfile.mapping.profile[profile.appLabel].replace('.', ' (') + ')'
        profile.value = selectedProfile.mapping.profile[profile.appLabel]
      }
    })
  } else {
    selectedProfile.profileSpec.profile.forEach(function(profile){
      profile.personaField = selectedProfile.profileSpec.id + ' (' + profile.appLabel + ')'
      profile.value = ''
    })
    selectedProfile.mapping = {
      "id": selectedProfile.profileSpec.id,
      "sourceDna": selectedProfile.profileSpec.sourceDna,
      "type": "object",
      "expiry": selectedProfile.profileSpec.expiry,
      "profile": {}
    }
  }
  console.log(selectedProfile)

  let profile = selectedProfile.profileSpec
  return {
    profileHash: state.holoVault.profile.profileHash,
    mapping: selectedProfile.mapping,
    profileSpec: profile,
    personas: state.holoVault.profile.personas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    personaCreate: (mapping) => {
      dispatch(personaCreate(mapping))
    },
    profileMappingCreate: (mapping) => {
      dispatch(profileMappingCreate(mapping))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)
