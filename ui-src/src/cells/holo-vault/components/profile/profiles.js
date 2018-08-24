import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../../../withRoot';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/List'
import ListItemAvatar from '@material-ui/core/List'
import ListItemText from '@material-ui/core/List'
import Avatar from '@material-ui/core/Avatar'
// import Markdown from 'react-markdown'
const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
});

class Profiles extends React.Component {
  render() {
    const { classes, profiles } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Profiles
        </Typography>
        <Typography variant='body1' gutterBottom>
          Each time an app asks for Profile Information it gets stored here so you can see exactly what your informaiton is being used for.
        </Typography>
        <List>
          {
            profiles.map((profile, index) => (
              <Route render={({ history}) => (
                <ListItem key={index} button="button" onClick={() => { history.push(`/holo-vault/profile/${profile.name}`) }}>
                  <ListItemAvatar >
                    <Avatar style={{marginTop: 10, borderRadius: 0 }}  src={profile.src} />
                  </ListItemAvatar>
                  <ListItemText primary={profile.name} />
                </ListItem>
              )} />
            ))
          }
        </List>
      </div>
    );
  }
}

Profiles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Profiles));