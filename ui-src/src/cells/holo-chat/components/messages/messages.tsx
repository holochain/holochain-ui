import * as React from 'react'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import {List, ListItem, ListItemText } from '@material-ui/core'
import Message from './message'
import {Messages as MessagesType} from '../../types/message'

const styles: StyleRulesCallback = (theme: Theme) => ({
  listItemMessage: {
    position: 'relative'
  }
})

interface MessagesProps {
  classes: any,
  messages: MessagesType
}

class Messages extends React.Component<MessagesProps, {}> {
  render () {
    const { classes, messages } = this.props
    return (
      <List>
        {messages.map((messageByDate, messageDateIndex: number) => (
          <List>
            <ListItem key={messageDateIndex} dense={true} className={classes.listItemMessage}>
              <ListItemText className={classes.date} primary={messageByDate.date} />
            </ListItem>
            <ListItem key={messageDateIndex} dense={true} className={classes.listItemMessage}>
              <List>
                {messageByDate.messages.map((message, index) => (
                  <ListItem key={index} dense={true} className={classes.listItemMessage}>
                    <Message message={message} />
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </List>
        ))}
      </List>
    )
  }
}


export default withRoot(withStyles(styles)(Messages))
