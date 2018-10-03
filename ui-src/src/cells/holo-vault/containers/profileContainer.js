//
// import { connect } from 'react-redux'
// import ProfileForm from '../components/profile/profile'
// import {
//   personaCreate,
//   profileMappingCreate
// } from '../actions'
//
//
//
// const mapStateToProps = (state, ownProps) => {
//   const profileName = ownProps.match.params.name
//   let selectedProfile = state.holoVault.profile.profiles.filter(function (profile){
//     return profileName === profile.name
//   })[0]
//   //use the mapping to find the values, combine the values with the spec
//   if(selectedProfile.mapping !== undefined){
//     selectedProfile.profileSpec.profile.forEach(function(profile){
//       if(selectedProfile.mapping.profile[profile.appLabel] !== undefined){
//         profile.personaField = selectedProfile.mapping.profile[profile.appLabel].replace('.', ' (') + ')'
//         //Get the value from the Persona
//         let mapId = selectedProfile.mapping.profile[profile.appLabel]
//         let personaId = mapId.split('.')[0]
//         let personaValueid = mapId.split('.')[1]
//         console.log(mapId)
//         console.log(personaId)
//         console.log(personaValueid)
//         console.log(state.holoVault.profile.personas)
//         let selectedPersona = state.holoVault.profile.personas.filter(function (persona){
//           console.log(persona)
//           return persona.persona.name === personaId
//         })[0]
//         let profileValue = selectedPersona.persona.personaFields.filter(function (field){
//           return Object.keys(field)[0] === personaValueid
//         })[0]
//         console.log(selectedPersona.persona.personaFields)
//         console.log(profileValue[personaValueid])
//
//         profile.value = profileValue[personaValueid]
//       }
//     })
//   } else {
//     selectedProfile.profileSpec.profile.forEach(function(profile){
//       profile.personaField = selectedProfile.profileSpec.id + ' (' + profile.appLabel + ')'
//       profile.value = ''
//     })
//     selectedProfile.mapping = {
//       "id": selectedProfile.profileSpec.id,
//       "sourceDna": selectedProfile.profileSpec.sourceDna,
//       "type": "object",
//       "expiry": selectedProfile.profileSpec.expiry,
//       "profile": {}
//     }
//   }
//   console.log(selectedProfile)
//
//   let profile = selectedProfile.profileSpec
//   return {
//     profileHash: state.holoVault.profile.profileHash,
//     mapping: selectedProfile.mapping,
//     profileSpec: profile,
//     personas: state.holoVault.profile.personas
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     personaCreate: (mapping) => {
//       dispatch(personaCreate(mapping))
//     },
//     profileMappingCreate: (mapping) => {
//       dispatch(profileMappingCreate(mapping))
//     }
//   }
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ProfileForm)
