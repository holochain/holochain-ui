import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import withRoot from '../../../../withRoot'
import Typography from 'material-ui/Typography'
import  * as constants from '../../constants.js'

const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
  logo: {
    paddingTop: theme.spacing.unit * 5,
    display: 'block',
    margin: '0 auto'
  }
});

class Holochain extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Holo Chain
        </Typography>
        <Typography variant='body1'>
          Welcome to Holochain, your time has come to own your own digital life and take control fo your data.
          <img alt='Holochain logo' className={classes.logo} src={constants.logo.image} />

        </Typography>
      </div>
    );
  }
}

Holochain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Holochain));
