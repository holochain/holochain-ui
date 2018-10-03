import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import withRoot from '../../../../withRoot';
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
  create: Function
}

export type Props = OwnProps & StateProps & DispatchProps & RouterProps

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


function PersonaField(props: {index: number, field: PersonaField, onChange: (updatedField: PersonaField) => void}) {
  
  const onChangeName = (newName: string): void => {
    props.onChange({
      ...props.field,
      name: newName
    });
  }

  const onChangeData = (newData: string): void => {
      props.onChange({
      ...props.field,
      data: newData
    });
  }

  return (
    <div key={props.index}>
      <TextField name={`fieldName${props.index}`} label='Field Name' value={props.field.name} onChange={(e) => onChangeName(e.target.value)} />
      <TextField name={`fieldValue${props.index}`} label='Field Value' value={props.field.data} onChange={(e) => onChangeData(e.target.value)} />
    </div>
  )
}





class Persona extends React.Component<Props, State> {

  handleSubmit = () => {

    if(this.state.persona.hash === ""){
      const personaSpec: PersonaSpec = {"name": this.state.persona.name}
      const personaFields: Array<PersonaField> = this.state.persona.fields
      this.props.create(personaSpec, personaFields)
    } else {
      // this.props.update(persona)
    }
    // this.props.history.push("/holo-vault/personas")
    // this.props.personasList()
  }

  handleAddPersonaField = () => {
    this.setState({
        persona: {
            ...this.state.persona,
            fields: [...this.state.persona.fields, {"name": "", "data": ""}]
        }
    })
  }


  componentDidMount(){
    this.setState({
      persona: this.props.currentPersona
    })
  }


  updateField(newField: PersonaField, index: number) {
    const fields = this.state.persona.fields;
    this.setState({
      persona: {
        ...this.state.persona,
        fields: [...fields.slice(0, index), newField, ...fields.slice(index+1)]
      }
    })
  }

  updateName(newName: string) {
    this.setState({
      persona: {
        ...this.state.persona,
        name: newName
      }
    })
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Manage Your Personas
        </Typography>
        <Typography variant='body1' gutterBottom={true}>
          You can add a new Persona and add as many fields to it as you like. You will probably have a *Personal*, *Work* and a *Friends* persona.
        </Typography>
          <div>
            <TextField name="personaName" value={this.state.persona.name} onChange={e => this.updateName(e.target.value)} label="Persona Name"/>
          </div>
          {this.state.persona.fields.map((field: PersonaField, index: number) =>(<PersonaField index={index} field={field} onChange={(newField: PersonaField) => this.updateField(newField, index)}/>))}
          <Button name='addField' variant='raised' className={classes.button} onClick={this.handleAddPersonaField}>
            <TextFields/>
            Add Field
          </Button>
          <Button name='createPersona' variant='raised' className={classes.button} onClick={() => this.handleSubmit()}>
            <PersonAdd/>
            {this.props.buttonText}
          </Button>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(withRouter(Persona)));
