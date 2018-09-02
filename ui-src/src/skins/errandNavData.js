import React from 'react';
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dashboard from '@material-ui/icons/Dashboard'
import Group from '@material-ui/icons/Group'

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

class ErrandNav extends React.Component {

  render() {
    return (<Route render={({history}) => (
      <List>
        <div>
          <ListItem key="boards" button onClick={() => { history.push('/errand/boards')}}>
            <ListItemIcon>
              <Dashboard/>
            </ListItemIcon>
            <ListItemText primary='Boards'/>
          </ListItem>
        </div>
      </List>
    )}/>
    )
  }
}

ErrandNav.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles, { withTheme: true })(ErrandNav));
