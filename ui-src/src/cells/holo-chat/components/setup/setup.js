import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import withRoot from '../../../../withRoot'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
});

class Setup extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Holo Chat
        </Typography>
        <Typography variant='body1'>
          Please click
          <Route render={({ history}) => (
            <Button onClick={() => { history.push('/profile/HoloChat - Holo Team') }}>Profile</Button>
          )} />
          and join the fun.
          **Note** The first person (initiator) to use the cell will configure the ProfileSpec for this cell.
          ProfileSpec creator is a HoloVault feature that bridges to HoloChat to save the ProfileSpec for that cell
        </Typography>
      </div>
    );
  }
}

Setup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Setup));
