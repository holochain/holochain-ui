import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import withRoot from '../../../../withRoot'
import Typography from '@material-ui/core/Typography'
// import  * as constants from '../../constants'

const styles: StyleRulesCallback = (theme: Theme) => ({
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

interface HolochainProps {
  classes: any

}

class Holochain extends React.Component<HolochainProps, {}> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Holo Chain
        </Typography>
        <Typography variant='body1'>
          Welcome to Holochain, your time has come to own your own digital life and take control of your data.
          <img alt='Holochain logo' className={classes.logo} />

        </Typography>
      </div>
    );
  }
}


export default withRoot(withStyles(styles)(Holochain));
