import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import  * as synApps from '../synApps/installed.js'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

function Mobile(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
              Holochain
            </Typography>
            <Typography variant="title" align="center" color="textSecondary" paragraph>
              These are all the synApps you have installed in your Holochain.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    synApps Store
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Check your Holo
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <List id="hApps" component="nav">
            {
              synApps.installed.map((group, index) => (
                <ListItem id={group.name} divider={true}>
                  <List>
                    <ListItem >
                      <Typography variant="title" align="center" color="textSecondary" paragraph>
                        {group.name}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      {group.hApps.map(app => (
                        <Grid item key={app.name} sm={6} md={4} lg={3}>
                          <img src={app.image} alt={app.name} width="75" height="75" />
                        </Grid>
                      ))}
                    </ListItem>
                  </List>
                </ListItem>))
            }
          </List>
        </div>



        <Grid container spacing={40}>

        </Grid>


      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="title" align="center" gutterBottom>
          Holo
        </Typography>
        <Typography variant="subheading" align="center" color="textSecondary" component="p">
          Where the Crowd is the Cloud
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Mobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Mobile));
