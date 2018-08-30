import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {Route} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person'
import PersonAdd from '@material-ui/icons/PersonAdd'
import withRoot from '../../../../withRoot';
import {Persona} from '../../types/profile'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

interface PersonasProps {
  classes: any,
  personas: Array<Persona>,
  personasList: any
}

class Personas extends React.Component<PersonasProps, {}> {
  componentDidMount() {
    console.log("get personas")
    this.props.personasList()
  }

  // tslint:disable jsx-no-lambda
  render() {
    const {classes, personas} = this.props;
    return (<div className={classes.root}>
      <Typography variant='display1'>
        Personas Hi
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        Look after your personal information here, click on a Persona to update or click Add Persona to create a new one.
      </Typography>
      <List id="personas" component="nav">

        {
          personas.map((persona: Persona, index: number) => (<Route render={({history}) => (
            <ListItem id={persona.hash} button={true} onClick={() => {
                history.push(`/holo-vault/persona/${persona.persona.name}`)
              }}>
              <ListItemIcon>
                <Person/>
              </ListItemIcon>
              <ListItemText primary={persona.persona.name}/>
            </ListItem>)}/>))
        }
      </List>
      <Route render={({history}) => (<Button name='addPersona' variant='raised' className={classes.button} onClick={() => {
            history.push(`/holo-vault/persona/new`)
          }}>
          <PersonAdd/>
          Add Persona
        </Button>)}/>
    </div>);
  }
}


export default withRoot(withStyles(styles)(Personas));
