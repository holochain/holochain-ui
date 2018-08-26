
import { connect } from 'react-redux'
import PersonaForm from '../components/persona/persona'
import {
  personaCreate,
  personaUpdate,
  personasList
} from '../actions'

const mapStateToProps = (state, ownProps) => {
  let buttonText = 'Update Persona'
  let persona = {}
  let hash = ""
  const personaName = ownProps.match.params.name
  console.log(personaName)
  let filteredPersona = state.holoVault.profile.personas.filter(function (persona){
    return personaName === persona.persona.name
  })[0]
  if (filteredPersona === undefined){
    persona = {
        "name": "",
        "personaFields": [
        ]
    }
    hash = ""
    buttonText = "Create Persona"
  } else {
    persona = filteredPersona.persona
    hash = filteredPersona.hash
  }

  return {
    buttonText: buttonText,
    title: `Persona - ${personaName}`,
    persona: persona,
    hash: hash
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    personaCreate: (persona) => {
      dispatch(personaCreate(persona))
    },
    personaUpdate: (persona) => {
      dispatch(personaUpdate(persona))
    },
    personasList: () => {
      dispatch(personasList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonaForm)
