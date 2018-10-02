import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import withRoot from '../../../../withRoot';
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import { PersonaField, Persona as PersonaType, PersonaSpec } from '../../types/persona'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import PersonAdd from '@material-ui/icons/PersonAdd'
import TextFields from '@material-ui/icons/TextFields'

export interface RouterProps extends RouteComponentProps<{}> {}

export interface OwnProps {
  classes?: any
}

export interface StateProps {
  currentPersona: PersonaType,
  buttonText: string,
  title: string
}

export interface DispatchProps {
  Create: Function
}

export type Props = OwnProps & StateProps & DispatchProps

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
});

//@ts-ignore
const renderTextField = ({ label, required }) => (
  <TextField label={label} required={required} />
)
//
// const validate = values => {
//   const errors = {}
//   const requiredFields = [
//     'userName',
//     'firstName',
//     'lastName',
//     'email'
//   ]
//   requiredFields.forEach(field => {
//     if (!values[field]) {
//       errors[field] = true
//     }
//   })
//   return errors
// }

function PersonaFields (props: {persona: PersonaType}) {
  if(props.persona.fields !== undefined){
    return (
      <div>
        {props.persona.fields.map((field: PersonaField, index) => (
            <div key={index}>
              <Field name={`fieldName${index}`} component={renderTextField} label="Field Name" required={true} />
              <Field name={`fieldValue${index}`} component={renderTextField} label="Field Value" required={true} />
            </div>
          )
        )}
      </div>
    )
  } else {
    return (
      <div>
        <Typography variant='subheading' />
      </div>
    )
  }
}

class Persona extends React.Component<Props & InjectedFormProps> {
  state = {
    persona: {}
  }

  handlePersona = (values: any) => {
    let fields: Array<PersonaField> = []

    Object.keys(values).forEach(function(field){
      // if(field !== 'personaName'){
      //   if(isFieldName){
      //     currentField = values[field]
      //     isFieldName = false
      //   } else {
      //     currentFieldValue = values[field]
      //     fields.push(JSON.parse('{"' + currentField + '":"' + currentFieldValue + '"}'))
      //     isFieldName = true
      //   }
      // }
    })
    let persona: PersonaType =
      {
        hash: "",
        name: values.personaName,
        fields: fields
      }

    if(persona.hash === ""){
      const personaSpec: PersonaSpec = {"name": persona.name}
      const personaFields: Array<PersonaField> = persona.fields
      this.props.Create(personaSpec, personaFields)
    } else {
      // this.props.Update(persona)
    }
    // this.props.history.push("/holo-vault/personas")
    // this.props.personasList()
  }

  // handleAddPersonaField = () =>   {
  //   let personaFields = this.state.persona.personaFields.slice()
  //   this.setState(prevState => ({
  //       persona: {
  //           ...prevState.persona,
  //           personaFields: [...prevState.persona.personaFields, personaFields]
  //       }
  //   }))
  // }

  componentDidMount(){
    // let initial = {
    //   personaName: this.props.persona.name
    // }
    // this.props.persona.personaFields.map((field, index) => (
    //   initial[`fieldName${index}`] = Object.keys(field)[0]
    // ))
    // this.props.persona.personaFields.map((field, index) => (
    //   initial[`fieldValue${index}`] = field[Object.keys(field)]
    // ))
    // this.props.initialize(initial)
  }
  render() {
    const { classes, handleSubmit, currentPersona } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Manage Your Personas
        </Typography>
        <Typography variant='body1' gutterBottom={true}>
          You can add a new Persona and add as many fields to it as you like. You will probably have a *Personal*, *Work* and a *Friends* persona.
        </Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="personaName" component={renderTextField} label="Persona Name" required={true} />
          </div>
          <PersonaFields persona={currentPersona}/>
          <Button name='addField' variant='raised' className={classes.button}>
            <TextFields/>
            Add Field
          </Button>
          <Button name='createPersona' variant='raised' className={classes.button} onClick={handleSubmit(this.handlePersona)}>
            <PersonAdd/>
            {this.props.buttonText}
          </Button>
        </form>
      </div>
    );
  }
}

const PersonaForm = reduxForm({form: 'Persona'})(Persona) as any
export default withRoot(withStyles(styles)(withRouter(PersonaForm)));
