
import { connect } from 'react-redux'
import Personas from '../components/persona/personas'
import {
  personasList
} from '../actions'




const mapStateToProps = state => {
  return {
    personas: state.holoVault.profile.personas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    personasList: () => {
      dispatch(personasList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personas)
