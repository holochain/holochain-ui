import * as React from 'react'
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

import {
  StyleRulesCallback,
  TextField,
  MenuItem,
  Grid
} from '@material-ui/core/'

const styles: StyleRulesCallback = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    marginTop: theme.spacing.unit * 2
  },
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginLeft: 25,
    marginBottom: 25
  },
  selectContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    width: '100%',
    marginBottom: 25
  },
  select: {
    width: '100%'
  }
})

export interface RouterProps extends RouteComponentProps<{hash: string}> {}

export interface OwnProps {
  classes?: any,
  onSubmit?: () => void
}

export interface DispatchProps {
  save: (profile: ProfileType, personas: Array<PersonaType>) => Promise<any>
  getProfiles: typeof GetProfiles.sig
  getPersonas: typeof GetPersonas.sig
  setCurrentPersona: (newCurrentPersona: PersonaType) => void
}

export interface StateProps {
  personas: Array<PersonaType>
  selectedPersona: PersonaType
  profile: ProfileType,
}

export interface State {
  profile: ProfileType
  personas: Array<PersonaType>
}

export type Props = OwnProps & DispatchProps & StateProps

class Profile extends React.Component<Props & RouterProps, State> {
  constructor (props: Props & RouterProps) {
    super(props)
    this.state = {
      profile: props.profile,
      personas: props.personas
    }
  }

  componentDidMount () {
    this.props.getPersonas({})
      .then(() => this.props.getProfiles({}))
      .catch((err) => console.log(JSON.stringify(err)))
  }

  static getDerivedStateFromProps (nextProps: Props & RouterProps, prevState: State) {
    if (!prevState.profile) {
      return {
        profile: nextProps.profile
      }
    } else {
      return null
    }
  }

  handleMappingChange = (updatedField: ProfileField, value: string) => {
    // To be able to save new Persona fields we add new fields to the existing personas.
    console.log('updatedField')
    if (updatedField.mapping !== undefined) {
      let personas = this.props.personas
      let personaAddress = updatedField.mapping.personaAddress
      let personaFieldName = updatedField.mapping.personaFieldName
      let selectedPersonas = personas.filter(function (persona: PersonaType) {
        return persona.hash === personaAddress
      })
      if (selectedPersonas.length === 1) {
        let selectedPersonaFields = selectedPersonas[0].fields.filter(function (field) {
          return field.name === personaFieldName
        })
        if (selectedPersonaFields.length === 0) {
          selectedPersonas[0].fields.push({ name: personaFieldName, data: value })
          this.setState({
            personas: personas
          })
        }
      }
    }

    this.state.profile.fields.filter(function (field) {
      return field.name === updatedField.name
    })[0] = updatedField

    this.setState({
      profile: this.state.profile
    })
  }

  handleSaveProfile = () => {
    this.props.save(this.state.profile, this.props.personas)
      .then(this.props.getProfiles)
      .then(() => {
        if (this.props.onSubmit) {
          this.props.onSubmit()
        }
      })
      .catch(err => console.log(err))
  }

  public handleChangeSelectedPersona = (event: any) => {
    let personaAddress = event.target.value
    let selectedPersona = this.props.personas.filter(function (persona: PersonaType) {
      return persona.hash === personaAddress
    })[0]
    this.props.setCurrentPersona(selectedPersona)
  }

  render () {
    if (!this.props.selectedPersona || !this.props.profile) {
      return (
        <Grid container={true} justify='center'>
          <CircularProgress/>
        </Grid>
      )
    }

    const { profile, classes } = this.props
    return (
      <div>
        <Paper className={classes.selectContainer}>
          <TextField name='PersonasSelect' className={classes.select} select={true} value={this.props.selectedPersona.hash} onChange={this.handleChangeSelectedPersona} label='Selected Persona'>
          {this.props.personas.map((persona) => {
            return (
              <MenuItem key={persona.hash} value={persona.hash} >
                {persona.name}
              </MenuItem>
            )
          })}
          </TextField>
        </Paper>
        <Paper className={classes.form}>
          {this.state.profile.fields.map((field, i) => {
            return (
              <FieldMapper
                key={i}
                personas={this.props.personas}
                selectedPersona={this.props.selectedPersona} // make sure the currentPersona is at the top
                profile={profile}
                field={field}
                mapSaved={this.props.profile.fields[i].mapping}
                handleMappingChange={this.handleMappingChange}
              />
            )
          })}
          <Button name='addField' variant='contained' className={classes.button} onClick={this.handleSaveProfile}>
            <Save/>
            Save Profile
          </Button>
        </Paper>

      </div>
    )
  }
}

export { Profile as ProfileBase }
export default withRoot(withStyles(styles)(withRouter(Profile)))
