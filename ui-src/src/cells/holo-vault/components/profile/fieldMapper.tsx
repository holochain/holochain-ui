
import * as React from 'react'
import { StyleRulesCallback, TextField } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import withRoot from '../../../../withRoot'
import { Profile, ProfileField, ProfileMapping } from '../../types/profile'
import { Persona, PersonaField } from '../../types/persona'
import Person from '@material-ui/icons/Person'

// import Warning from '@material-ui/icons/Warning'

import AutoCompleteProfileField from './autoCompleteProfileField'

const styles: StyleRulesCallback = theme => ({
  root: {
    width: '100%'
  }
})

export interface OwnProps {
  classes?: any
  personas: Array<Persona>
  profile: Profile
  selectedPersona: Persona
  field: ProfileField
}

export interface DispatchProps {
  updateNewPersona: (persona: Persona) => void
  updateNewField: (field: PersonaField) => void
  udateConflictFlag: (flag: boolean) => void
  updateData: (data: string) => void
  updateMapping: (mapping: ProfileMapping) => void
}

export interface StateProps {
  newPersona: Persona
  newField: PersonaField
  conflict: boolean
}

export interface State {
  expansionPanelOpen: boolean
}

export type Props = OwnProps & DispatchProps & StateProps

class FieldMapper extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      expansionPanelOpen: false
    }
  }
  handleMappingChange () {
    console.log('callback')
  }

  render () {
    const { classes, field, personas, profile } = this.props
  	return (
      <div className={classes.root}>
        <ExpansionPanel expanded={this.state.expansionPanelOpen}>
          <ExpansionPanelSummary expandIcon={<Person onClick={() => { this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen }) }}/>}>
            <AutoCompleteProfileField
              personas={personas}
              profile={profile}
              field={field}
              handleMappingChange={() => null}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <TextField
                name='persona'
                label='Persona'
              />
              <TextField
                name='field'
                label='Field'
              />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
  	)
  }
}

export default withRoot(withStyles(styles)(FieldMapper))
