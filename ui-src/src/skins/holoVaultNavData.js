import React from 'react';
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/List'
import Home from '@material-ui/icons/Home'
import Person from '@material-ui/icons/Person'
import withRoot from '../withRoot';

const styles = theme => ({
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
    }
  }
);

class HoloVaultNav extends React.Component {

  render() {
    const { classes, theme } = this.props;

    return (<Route render={({history}) => (
      <List>
        <div>
          <ListItem key="persoans" button onClick={() => { history.push('/holo-vault/personas')}}>
            <ListItemIcon>
              <Person/>
            </ListItemIcon>
            <ListItemText primary='Personas'/>
          </ListItem>
          <ListItem key="propfiles" button onClick={() => { history.push('/holo-vault/profiles')}}>
            <ListItemIcon>
              <Person/>
            </ListItemIcon>
            <ListItemText primary='Profiles'/>
          </ListItem>
        </div>
      </List>
    )}/>
    )
  }
}

HoloVaultNav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles, { withTheme: true })(HoloVaultNav));
