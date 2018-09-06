import * as React from 'react'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import {List, ListItem } from '@material-ui/core'
import MessageView from './messageView'
import {Message as MessageType} from '../../types/view/message'

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
          messages.map((message: any, index: number) => (
            <ListItem key={index} dense={true} className={classes.listItemMessage}>
              <MessageView message={message} />
            </ListItem>
          ))
        }
      </List>
    )
  }
}


export default withRoot(withStyles(styles)(Messages))
