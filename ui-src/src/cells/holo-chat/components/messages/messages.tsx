import * as React from 'react'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import {List, ListItem } from '@material-ui/core'
import MessageView from './messageView'
import {Message as MessageType} from '../../types/view/message'
import {Message as ModelMessage} from '../../types/model/message'
import {Channel as ChannelType} from '../../types/view/channel'
import {Identity} from '../../reducer'
// import {Message as MessageType} from '../../types/message'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Send from '@material-ui/icons/Send'


const styles: StyleRulesCallback = (theme: Theme) => ({
  listItemMessage: {
    position: 'relative'
  },
  textField: {
    float: 'left',
    width: '70%'
  },
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
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
  whoami: () => void,
  sendMessage: (message: ModelMessage) => void
}


interface MessageState {
   message: string;
}

class Messages extends React.Component<MessagesProps, MessageState> {
  getMessageInterval: any

  componentDidMount() {
    if(this.props.channel) {
      this.getMessageInterval = setInterval(() => {
        this.props.whoami()
        this.props.getMessages(this.props.channel)
        this.props.getMembers(this.props.channel)
      }, 200)
    }
  }

  componentWillUnmount() {
    clearInterval(this.getMessageInterval)
  }

  constructor(props: MessagesProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      message: ''
    }
  }


  handleSendMessage = () =>   {
    console.log(this.state.message)
    // call holochain here.
    this.props.sendMessage({
      channelId: this.props.channel,
      content: {
        text: this.state.message
      }
    })
    this.setState({message: ''})
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
     this.setState({message: e.target.value});
   }

  render () {
    const { classes, messages } = this.props

    messages.sort((a, b) => {
      return a.timestamp - b.timestamp
    })

    return (
      <div>
        <Paper style={{maxHeight: 400, overflow: 'auto', boxShadow: 'none'}}>
            <List>
            {
              messages.map((message: any, index: number) => (
                <ListItem key={index} dense={true} className={classes.listItemMessage}>
                  <MessageView message={message} />
                </ListItem>
              ))
            }
          </List>
        </Paper>
        <div style={{position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff'}}>
          <TextField
              id="message"
              label="Chat message"
              className={classes.textField}
              value={this.state.message}
              onChange={this.handleChange}
              margin="normal"
            />
          <Button variant="fab" className={classes.button} onClick={this.handleSendMessage}>
            <Send />
          </Button>
        </div>
      </div>
    )
  }
}


export default withRoot(withStyles(styles)(Messages))
