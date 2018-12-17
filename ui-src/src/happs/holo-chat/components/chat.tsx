import * as React from 'react'
import {
  Grid,
  Paper
} from '@material-ui/core'

import StreamsContainer from '../containers/streamsContainer'
import MessagesContainer from '../containers/messagesContainer'

const Chat = (props: any) => {
  const { classes } = props
  return (
    <Grid container={true} spacing={0} className={classes.chat}>
      <Grid item={true} xs={3} className={classes.channels}>
        <StreamsContainer {...props} title={'Public Channels'} isPublic={true} />
        <StreamsContainer {...props} title={'Direct Messages'} isPublic={false} />
      </Grid>
      <Grid item={true} xs={7} className={classes.messages}>
        <MessagesContainer {...props} />
      </Grid>
      <Grid item={true} xs={2}>
        <Paper/>
      </Grid>
    </Grid>
  )
}

export default Chat
