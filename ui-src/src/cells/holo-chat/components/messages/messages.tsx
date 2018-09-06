import * as React from 'react'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import {List, ListItem } from '@material-ui/core'
import MessageView from './messageView'
import {Message as MessageType} from '../../types/view/message'
import {Channel as ChannelType} from '../../types/view/channel'
import {Identity} from '../../reducer'

const styles: StyleRulesCallback = (theme: Theme) => ({
  listItemMessage: {
    position: 'relative'
  }
})

interface MessagesProps {
  classes: any,
  messages: Array<MessageType>,
  channel: ChannelType,
  members: Map<string, Identity>,
  myHash: string,
  getMessages: (channelUUID: string) => void,
  getMembers: (channelUUID: string) => void,
  whoami: () => void
}

class Messages extends React.Component<MessagesProps, {}> {
  getMessageInterval: any

  componentDidMount() {
    if(this.props.channel) {
      this.getMessageInterval = setInterval(() => {
        this.props.whoami()
        this.props.getMessages(this.props.channel)
        this.props.getMembers(this.props.channel)
      }, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.getMessageInterval)
  }

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
