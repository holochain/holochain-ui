import * as React from 'react';
import { Route } from 'react-router-dom'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import withRoot from '../../../../withRoot';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

import Avatar from '@material-ui/core/Avatar'
// import Markdown from 'react-markdown'


import { Profile } from '../../types/profile'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit
  },
});

interface ProfilesProps {
  classes: any,
  profiles: Array<Profile>
}


class Profiles extends React.Component<ProfilesProps, {}> {
  render() {
    const { classes, profiles } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Profiles
        </Typography>
        <Typography variant='body1' gutterBottom={true}>
          Each time an app asks for Profile Information it gets stored here so you can see exactly what your information is being used for.
        </Typography>
        <List>
          {
            profiles.map((profile: Profile, index: number) => (
              // tslint:disable-next-line jsx-no-lambda
              <Route render={({ history }) => (
                <ListItem key={index} button={true} onClick={() => { history.push(`/holo-vault/profile/${profile.name}`) }}>
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


export default withRoot(withStyles(styles)(Profiles));
