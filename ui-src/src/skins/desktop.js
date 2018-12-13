import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import Grid from '@material-ui/core/Grid'
import presenceLargeGroup from '../hApps/holo-chat/data/presence-large-group.json'
import PresenceArcs from '../hApps/holo-chat/components/presence/presenceArcs'

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
  presenceContainer: {
    display: 'inline-block'

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
            <Typography variant="title" align="center" color="textSecondary" paragraph>
              Organisation wide Presence Map
            </Typography>

            <div className={classes.presenceContainer}>
              <PresenceArcs arcs={presenceLargeGroup} strokeWidth={2}/>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="title" align="center" gutterBottom>
          Holo
        </Typography>
        <Typography variant="h3" align="center" color="textSecondary" component="p">
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
