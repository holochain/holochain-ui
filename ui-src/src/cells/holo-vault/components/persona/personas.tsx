import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import { withRouter, Route, RouteComponentProps } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Person from '@material-ui/icons/Person'
import PersonAdd from '@material-ui/icons/PersonAdd'
import withRoot from '../../../../withRoot'
import { Persona as PersonaType } from '../../types/persona'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
})

export interface OwnProps {
  classes?: any
}

export interface StateProps {
  personas: Array<PersonaType>
}

export interface DispatchProps {
  getPersonas: Function
}

export interface RouterProps extends RouteComponentProps<{}> {}

export type Props = OwnProps & StateProps & DispatchProps

class Personas extends React.Component<Props & RouterProps, {}> {
  componentDidMount () {
    console.log('get personas')
    this.props.getPersonas()
  }

  // tslint:disable jsx-no-lambda
  render () {
    const { classes, personas } = this.props
    return (
    <div className={classes.root}>
      <Typography variant='h1'>
        Personas
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        Look after your personal information here, click on a Persona to update or click Add Persona to create a new one.
      </Typography>
      <List id='personas' component='nav'>
        {
          personas.map((persona: PersonaType, index: number) => (
            <Route
              render={({ history }) => (
                <ListItem
                  key={index}
                  id={persona.hash}
                  button={true}
                  onClick={() => {
                    history.push(`/holo-vault/persona/${persona.name}`)
                  }}
                >
                  <ListItemIcon>
                    <Person/>
                  </ListItemIcon>
                <ListItemText primary={persona.name}/>
                </ListItem>)}
            />))
        }
      </List>
      <Route
        render={({ history }) => (
          <Button
            name='addPersona'
            variant='contained'
            className={classes.button}
            onClick={() => {
              history.push(`/holo-vault/persona/new`)
            }}
          >
          <PersonAdd/>
          Add Persona
          </Button>)}
      />
    </div>)
  }
}

export default withRoot(withStyles(styles)(withRouter(Personas)))
