import * as React from 'react'
import { StyleRulesCallback } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import withRoot from '../../../../withRoot'
import { Profile as ProfileType, ProfileField } from '../../types/profile'
import { Persona as PersonaType } from '../../types/persona'

import AutoCompleteProfileField from './autoCompleteProfileField'

const styles: StyleRulesCallback = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    marginTop: theme.spacing.unit * 2
  }
})

export interface RouterProps extends RouteComponentProps<{name: string}> {}

interface OwnProps {
  classes?: any
}

interface DispatchProps {
}

interface StateProps {
  personas: Array<PersonaType>
  profile: ProfileType
}

export interface State {
  profile: ProfileType
}

export type Props = OwnProps & DispatchProps & StateProps

class Profile extends React.Component<Props & RouterProps, State> {
  constructor (props: Props & RouterProps) {
    super(props)
    this.state = {
      profile: props.profile
    }
  }

  handleMappingChange = (updatedField: ProfileField) => {
    let fields = this.state.profile.fields.filter(function (field) {
      return field.name === updatedField.name
    })
    if (fields.length !== 0) {
      fields[0] = updatedField
    }
    this.setState({
      profile: this.state.profile
    })
  }

  render () {
    const { profile, personas } = this.props
    return (
      <div>
        {this.state.profile.fields.map((field, i) => <AutoCompleteProfileField key={i} personas={personas} profile={profile} field={field} handleMappingChange={() => this.handleMappingChange(field)} />)}
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(withRouter(Profile)))
