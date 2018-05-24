import React from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import withRoot from '../../../../withRoot';
import {Field, reduxForm} from 'redux-form'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import FingerPrint from 'material-ui-icons/Fingerprint'
import ProfileField from './profileField'
const styles = theme => ({
  root: {
    textAlign: 'left',
    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit
  },
  icon: {
    flex: 1
  },
  persona: {
    flex: 0
  },
  button: {
    marginTop: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit,
  }
});

let suggestions = []
let profileMapping = {}
const renderProfileField = ({
  suggestions,
  name,
  key,
  label,
  specField,
  personaFieldValue,
  required,
  onSelect,
  meta: {
    touched,
    error
  },
  ...custom
}) => (<ProfileField name={name} personaFieldValue={personaFieldValue} specField={specField} key={key} label={label} error={touched && error} onSelect={onSelect} {...custom} suggestions={suggestions} />)

// const validate = values => {
//   const errors = {}
//   const requiredFields = ['userName', 'firstName', 'lastName', 'email']
//   requiredFields.forEach(field => {
//     if (!values[field]) {
//       errors[field] = true
//     }
//   })
//   return errors
// }

class Profile extends React.Component {
  state = {
    newPersona: {}
  }
  handleCreateProfile = () => {
    console.log(this.state.newPersona)
    if(this.state.newPersona.personaFields.length > 0){
      this.props.personaCreate(this.state.newPersona)
    } else {
      this.props.personas.splice(this.props.personas.length - 1, 1)
    }
    this.props.profileMappingCreate(profileMapping)
    this.props.history.push("/holo-vault/profiles")
  }

  //Gets the object from the field and creates the Profile mapping and if there are newField
  //creates the new Persona Object ready to save
  handleSelect = (personaProfileMapping) => {
    if(personaProfileMapping !== undefined){
      console.log(profileMapping)
      profileMapping.profile[personaProfileMapping.specField]= personaProfileMapping.personaName + '.' + personaProfileMapping.personaField
      let persona = this.props.personas.filter(function (persona){
        return persona.persona.name === personaProfileMapping.personaName
      })[0].persona
      let personaField = persona.personaFields.filter(function (field){
        return Object.keys(field)[0] === personaProfileMapping.personaField
      })
      console.log(personaField)

      if(personaField.length === 0){
        let newField = {}
        newField[personaProfileMapping.personaField] = personaProfileMapping.personaFieldValue
        persona.personaFields.push(newField)
      } else {
        personaField[0][personaProfileMapping.personaField] = personaProfileMapping.personaFieldValue
      }
      console.log(persona)

      if(personaProfileMapping.removeTyped){
        this.props.personas[this.props.personas.length - 1].persona.personaFields = this.props.personas[this.props.personas.length - 1].persona.personaFields.filter(function(personaField) {
          return Object.keys(personaField)[0] !== personaProfileMapping.specField
        })
      }
      console.log(this.props.personas[this.props.personas.length - 1].persona)
      this.setState({newPersona: this.props.personas[this.props.personas.length - 1].persona})
    }
  }

  componentDidMount(){
    this.props.personas.forEach(function(persona){
      persona.persona.personaFields.forEach(function(field){
        let key = Object.keys(field)[0]
        suggestions.push({ 'persona': persona.persona.name, 'field': key, 'label': field[key]})
      })
    })
    this.props.personas.push(
      {
        "hash": "",
        "persona": {
          "name": this.props.profileSpec.id.split('-')[0],
          "personaFields": []
        }
      }
    )
    //iterate through this.props.mapping and get the values from query

    profileMapping = this.props.mapping
    // this.props.initialize(tempProfileValues)
  }

  render() {
    const {classes, handleSubmit, profileSpec} = this.props
    return (<div className={classes.root}>
      <Typography variant='subheading'>
        {this.props.profileSpec.id} is requesting your personal information.
      </Typography>
      <Typography variant='body1' gutterBottom>
        Your personal information is managed by you in 1 location, 'HoloVault'. Other applications
        ask to borrow your info for a set amount of time and you can revoke that access when ever you like.
        Also you don't have to keep filling out the same info for every app and giving away your info. 'HoloVault'
        helps you reuse info you've already saved.
      </Typography>
      <form onSubmit={handleSubmit}>
        {
          profileSpec.profile.map((field, index) => (<div key={index}>
            <Field key={index} name={field.appLabel} specField={field.appLabel} onSelect={this.handleSelect} component={renderProfileField} label={field.display} suggestions={suggestions} usage={field.usage} personaField={field.personaField} personaFieldValue={field.value} className={classes.persona}/>
          </div>))
        }
        <Button name='createProfile' variant='raised' className={classes.button} onClick={handleSubmit(this.handleCreateProfile)}>
          <FingerPrint/>
          Create Profile
        </Button>
      </form>
    </div>);
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

// const ProfileForm = reduxForm({form: 'Profile', validate})(Profile)
const ProfileForm = reduxForm({form: 'Profile'})(Profile)
export default withRoot(withStyles(styles, { withTheme: true })(withRouter(ProfileForm)));
