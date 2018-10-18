import * as React from 'react'
import { StyleRulesCallback, TextField, MenuItem, Typography } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import withRoot from '../../../../withRoot'
import { Profile as ProfileType, ProfileField } from '../../types/profile'
import { Persona as PersonaType } from '../../types/persona'
import Save from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import { GetProfiles, GetPersonas } from '../../actions'
import FieldMapper from './fieldMapper'
// import Warning from '@material-ui/icons/Warning'

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
  save: (profile: ProfileType) => Promise<any>
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
    if (!state.profile) {
      return {
        profile: props.profile
      }
    } else {
      return null
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
      .then(this.props.getProfiles)
      .then(() => this.props.history.push('/holo-vault/profiles'))
      .catch(err => console.error(err))
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
        <Typography
          variant='display3'
          gutterBottom={true}
        >
        Select a persona for {profile.name}
        </Typography>
        <div>
          <TextField
            select={true}
            value={personas[0].hash}
            label='Persona'
          >
          {personas.map((persona) => {
            return (
              <MenuItem
                key={persona.hash}
                value={persona.hash}
              >
                {persona.name}
              </MenuItem>
            )
          })}
          </TextField>
        </div>

        <Typography
          variant='title'
          gutterBottom={true}
        >
        {profile.name} is requesting access to the following:
        </Typography>

        <div>
          {this.state.profile.fields.map((field, i) => {
            return (
              <FieldMapper
                key={i}
                personas={personas}
                profile={profile}
                profileField={field}
              />
            )
          })}
          <Button name='addField' variant='raised' className={classes.button} onClick={this.handleSaveProfile}>
            <Save/>
            Save Profile
          </Button>
        </div>

      </div>
    )
  }
}

export default withRoot(withStyles(styles)(withRouter(Profile)))
