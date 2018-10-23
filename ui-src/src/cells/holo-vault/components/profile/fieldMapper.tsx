
import * as React from 'react'
import { StyleRulesCallback, TextField } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import withRoot from '../../../../withRoot'
import { Profile, ProfileField, ProfileMapping } from '../../types/profile'
import { Persona, PersonaField } from '../../types/persona'

// import Warning from '@material-ui/icons/Warning'

import AutoCompleteProfileField from './autoCompleteProfileField'

const styles: StyleRulesCallback = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  }
})

export interface OwnProps {
  classes?: any
  personas: Array<Persona>
  profile: Profile
  primaryPersona: Persona
  profileField: ProfileField
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

export type Props = OwnProps & DispatchProps & StateProps

class FieldMapper extends React.Component<Props, {}> {

  handleMappingChange () {
    console.log('callback')
  }

  render () {
    const { classes, profileField, personas, profile } = this.props
  	return (
      <ExpansionPanel classes={classes.container}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <AutoCompleteProfileField
            personas={personas}
            profile={profile}
            field={profileField}
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
  	)
  }
}

export default withRoot(withStyles(styles)(FieldMapper))
