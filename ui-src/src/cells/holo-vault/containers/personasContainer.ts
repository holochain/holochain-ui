
import { connect } from 'react-redux'
import Personas, { OwnProps, StateProps, DispatchProps } from '../components/persona/personas'
import { Dispatch } from 'redux'

import {
  GetPersonas
} from '../actions'

const mapStateToProps = (state: any): StateProps => {
  return {
    personas: state.holoVault.profile.personas
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getPersonas: () => dispatch(GetPersonas.create({})) // can be written as  () => { return dispatch(...) }
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Personas)
