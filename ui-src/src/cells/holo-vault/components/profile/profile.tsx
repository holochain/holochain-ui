import * as React from 'react'
import { StyleRulesCallback, TextField, MenuItem, Typography } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
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
    marginTop: theme.spacing.unit,
    marginLeft: 25
  },
  selectContainer: {
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    width: '100%'
  },
  select: {
    width: '100%'
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
  selectedPersona: PersonaType
  profile: ProfileType,
  profiles: Array<ProfileType>
}

export interface State {
  profile: ProfileType
  selectedPersona: PersonaType
  personas: Array<PersonaType>
}

export type Props = OwnProps & DispatchProps & StateProps

class Profile extends React.Component<Props & RouterProps, State> {
  constructor (props: Props & RouterProps) {
    super(props)
    this.state = {
      profile: props.profile,
      selectedPersona: props.selectedPersona,
      personas: props.personas
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
        profile: props.profile,
        selectedPersona: props.selectedPersona,
        personas: props.personas
      }
    } else {
      return null
    }
  }

  handleMappingChange = (updatedField: ProfileField, value: string) => {
    this.state.profile.fields.filter(function (field) {
      return field.name === updatedField.name
    })[0] = updatedField
    this.setState({
      profile: this.state.profile
    })
  }

  handleSaveProfile = () => {
    console.log(this.state.profile)
    this.props.save(this.state.profile)
      .then(this.props.getProfiles)
      .then(() => this.props.history.push('/holo-vault/profiles'))
      .catch(err => console.error(err))
  }

  public handleChangeSelectedPersona = (event: any) => {
    let personaHash = event.target.value
    let selectedPersona = this.props.personas.filter(function (persona: PersonaType) {
      return persona.hash === personaHash
    })[0]
    let personas = this.props.personas
    let index: number = personas.map(function (persona: PersonaType) { return persona.hash }).indexOf(personaHash)
    if (index > 0) {
      let persona = personas.splice(index, 1)
      personas.unshift(persona[0])
    }
    this.setState({
      personas: personas,
      selectedPersona: selectedPersona
    })
  }

  render () {
    if (!this.state.profile || this.props.personas.length === 0) {
      return (
        <div>
          <CircularProgress/>
        </div>
      )
    }

    const { profile, classes } = this.props
    return (
      <div>
        <Typography variant='title' gutterBottom={true}>
        {profile.name} is requesting access to the following:
        </Typography>
        <Paper className={classes.selectContainer}>
          <TextField name='PersonasSelect' className={classes.select} select={true} value={this.state.selectedPersona.hash} onChange={this.handleChangeSelectedPersona} label='Selected Persona'>
          {this.state.personas.map((persona) => {
            return (
              <MenuItem key={persona.hash} value={persona.hash} >
                {persona.name}
              </MenuItem>
            )
          })}
          </TextField>
        </Paper>
        <div>
          {this.state.profile.fields.map((field, i) => {
            return (
              <FieldMapper
                key={i}
                personas={this.state.personas}
                selectedPersona={this.state.selectedPersona}
                profile={profile}
                field={field}
                handleMappingChange={() => this.handleMappingChange}
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
