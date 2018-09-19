import React from 'react';
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Message from '@material-ui/icons/Message'
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

class HoloChatNav extends React.Component {

  render() {
    return (<Route render={({history}) => (
      <List>
        <div>
          <ListItem key="messages" button onClick={() => {
            history.push('/holo-chat/messages');
            this.props.handleDrawerClose();
          }}>
            <ListItemIcon>
              <Message/>
            </ListItemIcon>
            <ListItemText primary='Messages'/>
          </ListItem>
          <ListItem key="channels" button onClick={() => {
            history.push('/holo-chat/channels');
            this.props.handleDrawerClose();
          }}>
            <ListItemIcon>
              <Group/>
            </ListItemIcon>
            <ListItemText primary='Channels'/>
          </ListItem>
        </div>
      </List>
    )}/>
    )
  }
}

HoloChatNav.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles, { withTheme: true })(HoloChatNav));
