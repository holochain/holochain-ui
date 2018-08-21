import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../../../../withRoot';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/List'
import ListItemText from '@material-ui/core/List'
import Person from '@material-ui/icons/Person'
import PersonAdd from '@material-ui/icons/PersonAdd'

const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit
  }
});

class Personas extends React.Component {
  componentDidMount() {
    console.log("get personas")
    this.props.personasList()
  }
  render() {
    const {classes, personas} = this.props;
    return (<div className={classes.root}>
      <Typography variant='display1'>
        Personas
      </Typography>
      <Typography variant='body1' gutterBottom>
        Look after your personal information here, click on a Persona to update or click Add Persona to create a new one.
      </Typography>
      <List>
        {
          personas.map((persona, index) => (
            <Route render={({ history}) => (
              <ListItem key={persona.hash} button="button" onClick={() => { history.push(`/holo-vault/persona/${persona.persona.name}`) }}>
                <Person/>
                <ListItemText primary={persona.persona.name} />
              </ListItem>
            )} />
          ))
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

Personas.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Personas));
