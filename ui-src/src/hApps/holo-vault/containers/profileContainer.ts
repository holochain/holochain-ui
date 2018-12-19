
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Profile as ProfileType, ProfileField } from '../types/profile'
import { Persona as PersonaType, PersonaField } from '../types/persona'
import Profile, { Props, RouterProps, StateProps, DispatchProps, OwnProps } from '../components/profile/profile'

import {
  CreateMapping,
  GetProfiles,
  GetPersonas,
  AddField,
  SetCurrentPersona
} from '../actions'

const mapStateToProps = (state: any, ownProps: Props & RouterProps): StateProps => {

  // use the route to filter profiles to get the selected profile
  // will return undefined if non-existent

  let profile: ProfileType

  // get the current profile from the url if possible
  if (ownProps.match) {
    const hash = ownProps.match.params.hash
    profile = state.holoVault.profile.profiles.filter((profile: ProfileType) => {
      return profile.sourceDNA === hash
    })[0]
  } else { // otherwise use the current profile from the state
    profile = state.holoVault.profile.currentProfile
  }

  return {
    personas: state.holoVault.profile.personas,
    selectedPersona: state.holoVault.profile.currentPersona,
    profile: profile
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getProfiles: () => dispatch(GetProfiles.create({})),
    getPersonas: () => dispatch(GetPersonas.create({})),
    setCurrentPersona: (newCurrentPersona: PersonaType) => { dispatch(SetCurrentPersona(newCurrentPersona)) },
    save: (profile: ProfileType, personas: Array<PersonaType>) => {
      // call createMapping on all of the fields with a mapping
      console.log('About to map ', profile)

      return Promise.all(
        profile.fields.filter(field => field.mapping).map((field: ProfileField) => {

          let actions = []

          console.log('add the persona field for ', field.displayName)
          if (field.mapping !== undefined) {
            let personaAddress = field.mapping.personaAddress
            let personaFieldName = field.mapping.personaFieldName
            let selectedPersonas = personas.filter(function (persona: PersonaType) {
              return persona.hash === personaAddress
            })
            if (selectedPersonas.length === 1) {
              let selectedPersonaFields = selectedPersonas[0].fields.filter(function (field) {
                return field.name === personaFieldName
              })
              if (selectedPersonaFields.length === 1) {
                let personaField: PersonaField = selectedPersonaFields[0]
                actions.push(dispatch(AddField.create({ persona_address: personaAddress, field: personaField })))
              }
            }
          }
          console.log('creating map for ', field)
          actions.push(dispatch(CreateMapping.create({mapping: {
            ...field.mapping!,
            retrieverDNA: profile.sourceDNA,
            profileFieldName: field.name
          }})))

          return Promise.all(actions)
        })
      )

    }
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
