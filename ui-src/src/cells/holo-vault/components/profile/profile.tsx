import * as React from 'react'
import { StyleRulesCallback } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import withRoot from '../../../../withRoot'
import { Profile as ProfileType, ProfileField } from '../../types/profile'
import { Persona as PersonaType } from '../../types/persona'
import Save from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import { GetProfiles, GetPersonas } from '../../actions'

import AutoCompleteProfileField from './autoCompleteProfileField'

const styles: StyleRulesCallback = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    marginTop: theme.spacing.unit * 2
  },
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
})

export interface RouterProps extends RouteComponentProps<{hash: string}> {}

export interface OwnProps {
  classes?: any
}

export interface DispatchProps {
  save: Function
  getProfiles: typeof GetProfiles.sig
  getPersonas: typeof GetPersonas.sig
}

export interface StateProps {
  personas: Array<PersonaType>
  profile: ProfileType,
  profiles: Array<ProfileType>
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

  componentDidMount () {
    this.props.getPersonas(undefined)
      .then(this.props.getProfiles)
      .catch((err) => console.log(err))
  }

  static getDerivedStateFromProps (props: Props & RouterProps, state: State) {
    return {
      profile: props.profile
    }
  }

  handleMappingChange = (updatedField: ProfileField) => {
    this.state.profile.fields.filter(function (field) {
      return field.name === updatedField.name
    })[0] = updatedField
    this.setState({
      profile: this.state.profile
    })
  }

  handleSaveProfile = () => {
    this.props.save(this.state.profile)
  }

  render () {

    if (!this.state.profile) {
      return (
        <div>
          <CircularProgress/>
        </div>
      )
    }

    const { profile, personas, classes } = this.props
    return (
      <div>
        {this.state.profile.fields.map((field, i) => <AutoCompleteProfileField key={i} personas={personas} profile={profile} field={field} handleMappingChange={() => this.handleMappingChange(field)} />)}
        <Button name='addField' variant='raised' className={classes.button} onClick={this.handleSaveProfile}>
          <Save/>
          Save Profile
        </Button>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(withRouter(Profile)))
