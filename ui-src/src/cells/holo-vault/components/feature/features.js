import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import withRoot from '../../../../withRoot';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List'
import { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import listfeatures from './listFeatures.md'
// import Markdown from 'react-markdown'
const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
});

class Features extends React.Component {
  render() {
    const { classes, features } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Features
        </Typography>
        <Typography variant='body1' gutterBottom>
          Each of the "Features" you have is listed here. Click on one to see all the data associated with this feature across your networks.
        </Typography>
        <List>
          {
            features.map((feature, index) => (
              <Route render={({ history}) => (
                <ListItem key={index} button onClick={() => { history.push(`/${feature.name}`) }}>
                  <ListItemAvatar >
                    <Avatar style={{marginTop: 10, borderRadius: 0 }}  src={feature.src} />
                  </ListItemAvatar>
                  <ListItemText primary={feature.name} secondary={feature.description} />
                </ListItem>
              )} />
            ))
          }
        </List>
      </div>
    );
  }
}

Features.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Features));
