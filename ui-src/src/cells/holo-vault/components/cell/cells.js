import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import withRoot from '../../../../withRoot';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List'
import { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
// import listCells from './listCells.md'
// import Markdown from 'react-markdown'
const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
});

class Cells extends React.Component {
  render() {
    const { classes, cells } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Cells
        </Typography>
        <Typography variant='body1' gutterBottom>
          Each of the "Cells" you are part of has a set of Apps in it, each of those Apps is listed here. Clicking the App will take you to the running instance of the App and will show you content from all of the Cells that use that App.
        </Typography>
        <List>
          {
            cells.map((cell, index) => (
              <Route render={({ history}) => (
                <ListItem key={index} button onClick={() => { history.push(`/holo-vault/cell/${cell.name}`) }}>
                  <ListItemAvatar >
                    <Avatar style={{marginTop: 10, borderRadius: 0 }}  src={cell.src} />
                  </ListItemAvatar>
                  <ListItemText primary={cell.name} secondary={cell.description} />
                </ListItem>
              )} />
            ))
          }
        </List>
      </div>
    );
  }
}

Cells.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Cells));
