
import * as React from 'react'
import { StyleRulesCallback, TextField } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import withRoot from '../../../../withRoot'
import { Profile, ProfileField } from '../../types/profile'
import { Persona as PersonaType, PersonaField as PersonaFieldType } from '../../types/persona'
import Person from '@material-ui/icons/Person'

// import Warning from '@material-ui/icons/Warning'

import AutoCompleteProfileField from './autoCompleteProfileField'

const styles: StyleRulesCallback = theme => ({
  root: {
    width: '100%'
  },
  persona: {
    width: '50%'
  },
  field: {
    width: '50%'
  }
})

export interface OwnProps {
  classes?: any
  personas: Array<PersonaType>
  profile: Profile
  selectedPersona: PersonaType
  field: ProfileField,
  handleMappingChange: any
}

export interface StateProps {
  newPersona: PersonaType
  newField: PersonaFieldType
  conflict: boolean
}

export interface State {
  expansionPanelOpen: boolean
  mappedPersona: PersonaType
  mappedField: string
}

export type Props = OwnProps & StateProps

class FieldMapper extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      expansionPanelOpen: false,
      mappedPersona: props.selectedPersona,
      mappedField: props.field.name
    }
  }

  componentDidMount () {
    if (this.props.field.mapping !== undefined) {
      this.setPersonaAndFieldName(this.props.field)
    }
  }

  handleMappingChange = (updatedField: ProfileField) => {
    this.props.handleMappingChange(updatedField)
    this.setPersonaAndFieldName(updatedField)
  }

  setPersonaAndFieldName (field: ProfileField) {
    if (field.mapping !== undefined) {
      let mapping = field.mapping
      let filteredPersonas = this.props.personas.filter(function (persona: PersonaType) {
        return mapping.personaHash === persona.hash
      })
      if (filteredPersonas.length !== 0) {
        this.setState({
          mappedPersona: filteredPersonas[0],
          mappedField: field.mapping.personaFieldName
        })
      }
    }
  }
  render () {
    const { classes, field, personas, selectedPersona, profile } = this.props
  	return (
      <div className={classes.root}>
        <ExpansionPanel expanded={this.state.expansionPanelOpen}>
          <ExpansionPanelSummary expandIcon={<Person name='expandPersonaDetails' onClick={() => { this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen }) }}/>}>
            <AutoCompleteProfileField
              personas={personas}
              selectedPersona={selectedPersona}
              profile={profile}
              field={field}
              handleMappingChange={() => this.handleMappingChange(this.props.field)}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <TextField className={classes.persona} name='persona' label='Persona' value={this.state.mappedPersona.name}/>
              <TextField className={classes.field} name='field' label='Field' value={this.state.mappedField}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
  	)
  }
}

export default withRoot(withStyles(styles)(FieldMapper))
