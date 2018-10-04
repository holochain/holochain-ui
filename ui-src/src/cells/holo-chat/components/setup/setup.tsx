import * as React from 'react'
import { Route } from 'react-router-dom'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import withRoot from '../../../../withRoot'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit
  }
})

interface SetupProps {
  classes: any
}

class Setup extends React.Component<SetupProps, {}> {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Holo Chat
        </Typography>
        <Typography variant='body1'>
          Please click
          <Route
            render={({ history }) => (
              <Button onClick={() => { history.push('/profile/HoloChat - Holo Team') }}>Profile</Button>
            )}
          />
          and join the fun.
          **Note** The first person (initiator) to use the cell will configure the ProfileSpec for this cell.
          ProfileSpec creator is a HoloVault feature that bridges to HoloChat to save the ProfileSpec for that cell
        </Typography>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Setup))
