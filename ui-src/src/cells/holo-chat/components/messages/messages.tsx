import * as React from 'react'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import {List, ListItem } from '@material-ui/core'
import Message from './message'
import {Message as MessageType} from '../../types/message'

const styles: StyleRulesCallback = (theme: Theme) => ({
  listItemMessage: {
    position: 'relative'
  }
})

interface MessagesProps {
  classes: any,
  messages: Array<MessageType>
}

class Messages extends React.Component<MessagesProps, {}> {
  render () {
    const { classes, messages } = this.props
    return (
      <List>
        {
          messages.map((message: MessageType, index: number) => (
            <ListItem key={index} dense={true} className={classes.listItemMessage}>
              <Message message={message} />
            </ListItem>
          ))
        }
      </List>
    )
  }
}


export default withRoot(withStyles(styles)(Messages))
