import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import withRoot from '../../../../withRoot';
import { Field, reduxForm } from 'redux-form'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField'
import PersonAdd from 'material-ui-icons/PersonAdd'
import TextFields from 'material-ui-icons/TextFields'

const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
});

const renderTextField = ({ input, label, required, meta: { touched, error },  ...custom }) => (
  <TextField label={label} required={required} error={touched && error} {...input} {...custom} />
)

const validate = values => {
  const errors = {}
  const requiredFields = [
    'userName',
    'firstName',
    'lastName',
    'email'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true
    }
  })
  return errors
}

function PersonaFields (props) {
  if(props.persona.personaFields !== undefined){
    return (
      props.persona.personaFields.map((field, index) => (
        <div key={index}>
          <Field name={`fieldName${index}`} component={renderTextField} label="Field Name" required={true} />
          <Field name={`fieldValue${index}`} component={renderTextField} label="Field Value" required={true} />
        </div>
      ))
    )
  } else {
    return (
      <div>
        <Typography variant='subheading'>
        </Typography>
      </div>
    )
  }
}

class Persona extends React.Component {
  state = {
    persona: {}
  }

  handlePersona = values => {
    let fields = []
    let currentFieldValue = ''
    let currentField = ''
    let isFieldName = true

    Object.keys(values).forEach(function(field){
      if(field !== 'personaName'){
        if(isFieldName){
          currentField = values[field]
          isFieldName = false
        } else {
          currentFieldValue = values[field]
          fields.push(JSON.parse('{"' + currentField + '":"' + currentFieldValue + '"}'))
          isFieldName = true
        }
      }

    })
    let persona =
    {
      "hash": this.props.hash,
      "persona": {
        "name": values.personaName,
        "personaFields": fields
      }
    }
    console.log(JSON.stringify(this.props.hash))
    if(this.props.hash === ""){
      this.props.personaCreate(persona.persona)
    } else {
      this.props.personaUpdate(persona)
    }
    this.props.personasList()
    this.props.history.push("/personas")
  }

  handleAddPersonaField = () =>   {
    let personaFields = this.state.persona.personaFields.slice()
    this.setState(prevState => ({
        persona: {
            ...prevState.persona,
            personaFields: [...prevState.persona.personaFields, personaFields]
        }
    }))
  }

  componentDidMount(){
    this.setState({
      persona: this.props.persona
    })
    let initial = {
      personaName: this.props.persona.name
    }
    this.props.persona.personaFields.map((field, index) => (
      initial[`fieldName${index}`] = Object.keys(field)[0]
    ))
    this.props.persona.personaFields.map((field, index) => (
      initial[`fieldValue${index}`] = field[Object.keys(field)]
    ))
    this.props.initialize(initial)
  }
  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Manage Your Personas
        </Typography>
        <Typography variant='body1' gutterBottom>
          You can add a new Persona and add as many fields to it as you like. You will probably have a *Personal*, *Work* and a *Friends* persona.
        </Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="personaName" component={renderTextField} label="Persona Name" required={true} />
          </div>
          <PersonaFields persona={this.state.persona}/>
          <Button name='addField' variant='raised' className={classes.button} onClick={this.handleAddPersonaField}>
            <TextFields/>
            Add Field
          </Button>
          <Route render={({ history}) => (
            <Button name='createPersona' variant='raised' className={classes.button} onClick={handleSubmit(this.handlePersona)}>
              <PersonAdd/>
              {this.props.buttonText}
            </Button>
          )} />
        </form>
      </div>
    );
  }
}

Persona.propTypes = {
  classes: PropTypes.object.isRequired
};

const PersonaForm = reduxForm({form: 'Persona', validate})(Persona)
export default withRoot(withStyles(styles)(withRouter(PersonaForm)));
