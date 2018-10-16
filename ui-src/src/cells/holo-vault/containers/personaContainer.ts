
import { connect } from 'react-redux'
import Persona, { Props, StateProps, DispatchProps, RouterProps } from '../components/persona/persona'
import { Dispatch } from 'redux'
import { PersonaField, Persona as PersonaType, PersonaSpec } from '../types/persona'
import {
  CreatePersona,
  AddField,
  GetPersonas
} from '../actions'

const mapStateToProps = (state: any, ownProps: Props & RouterProps): StateProps => {

  const personaName = ownProps.match.params.name
  let filteredPersona = state.holoVault.profile.personas.filter(function (persona: PersonaType) {
    return personaName === persona.name
  })[0]

  return {
    title: `Persona - ${personaName}`,
    currentPersona: filteredPersona,
    personas: state.holoVault.profile.personas
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getPersonas: () => dispatch(GetPersonas.create(undefined)),
    create: (personaSpec: PersonaSpec, personaFields: Array<PersonaField>) => {
      dispatch(CreatePersona.create(personaSpec)).then((response: any) => {
        const personaHash: string = response.payload.data
        return Promise.all(
          personaFields.map((field: PersonaField) => {
            return dispatch(AddField.create({ personaHash, field }))
          })
        )
      })
    },
    /* tslint:disable */
    update: (() => { }),
    delete: (() => { })
    /* tslint:enable */
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Persona)
