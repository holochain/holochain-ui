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

export interface State {
  persona: PersonaType
}
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
const renderTextField = ({label, content, required }) => (
  <TextField label={label} required={required} value={content} />
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

function PersonaFields (props: {persona: PersonaType, onChangeName:(personaField: PersonaField) => void, onChangeData:(personaField: PersonaField) => void}) {
  if(props.persona.fields !== undefined){
    return (
      <div>
        {props.persona.fields.map((field: PersonaField, index) => (
            <div key={index}>
              <TextField name={`fieldName${index}`} label='Field Name' value={field.name} onChange={() => props.onChangeName(field)} />
              <TextField name={`fieldValue${index}`} label='Field Value' value={field.data} onChange={() => props.onChangeData(field)} />
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

class Persona extends React.Component<Props & InjectedFormProps, State> {
  state = {
    persona: {
        "name": "",
        "hash": "",
        "fields": [
        ]
    }
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

    if(this.state.persona.hash === ""){
      const personaSpec: PersonaSpec = {"name": this.state.persona.name}
      const personaFields: Array<PersonaField> = this.state.persona.fields
      this.props.Create(personaSpec, personaFields)
    } else {
      // this.props.Update(persona)
    }
    // this.props.history.push("/holo-vault/personas")
    // this.props.personasList()
  }

  handleAddPersonaField = () =>   {
    this.setState(prevState => ({
        persona: {
            ...prevState.persona,
            personaFields: [prevState.persona.fields.push({"name": "", "data": ""})]
        }
    }))
    process.nextTick(() => {
      console.log(this.state.persona)
    })
  }

  onChangeData = (field: PersonaField) => {

  }

  componentDidMount(){
    this.setState({
      persona: this.props.currentPersona
    })
    let initial = {
      personaName: this.props.currentPersona.name
    }
    // this.props.persona.personaFields.map((field, index) => (
    //   initial[`fieldName${index}`] = Object.keys(field)[0]
    // ))
    // this.props.persona.personaFields.map((field, index) => (
    //   initial[`fieldValue${index}`] = field[Object.keys(field)]
    // ))
    this.props.initialize(initial)
  }

  render() {
    const { classes, handleSubmit } = this.props;
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
            <Field name="personaName" content={this.state.persona.name} component={renderTextField} label="Persona Name" required={true} />
          </div>
          <PersonaFields persona={this.state.persona}/>
          <Button name='addField' variant='raised' className={classes.button} onClick={this.handleAddPersonaField}>
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
