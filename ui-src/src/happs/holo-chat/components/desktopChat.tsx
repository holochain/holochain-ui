import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import withRoot from '../../../withRoot'
import {
  Grid,
  Paper
} from '@material-ui/core'

import StreamsContainer from '../containers/streamsContainer'
import MessagesContainer from '../containers/messagesContainer'

const styles: StyleRulesCallback = (theme: Theme) => ({
  chat: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: '#424242'
  },
  channels: {
    height: '100%',
    width: '100%'
  },
  messages: {
    height: '100%',
    width: '100%'
  }
})

export interface Props {
  classes?: any,
}

class DesktopChat extends React.Component<Props> {

  render () {
    const { classes } = this.props
    return (
      <Grid container={true} spacing={0} className={classes.chat}>
        <Grid item={true} xs={3} className={classes.channels}>
          <StreamsContainer {...this.props} title={'Public Channels'} isPublic={true} isMobile={false} />
          <StreamsContainer {...this.props} title={'Direct Messages'} isPublic={false} isMobile={false} />
        </Grid>
        <Grid item={true} xs={7} className={classes.messages}>
          <MessagesContainer {...this.props} isMobile={false} />
        </Grid>
        <Grid item={true} xs={2}>
          <Paper/>
        </Grid>
      </Grid>
    )
  }

}

export default withRoot(withStyles(styles)(DesktopChat))
