import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import Grid from '@material-ui/core/Grid'

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
    maxWidth: 1000,
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

function Desktop(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}

        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography variant="title" align="left" color="textSecondary" paragraph>
              Im thinking this view should be some sort of amazing empathic signal vs noise dashboard.
            </Typography>

            <Grid container spacing={40}>
              <Grid item key="empathy-signal-noise" sm={6} md={4} lg={3}>
                <img align="left" width="900" src="https://image.slidesharecdn.com/learn2learn3-2-17-170301234059/95/linkedin-learning-what-were-learning-about-learning-92-1024.jpg?cb=1488412050" alt="Thanx" />
              </Grid>
            </Grid>

          </div>
        </div>
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

Desktop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Desktop));
