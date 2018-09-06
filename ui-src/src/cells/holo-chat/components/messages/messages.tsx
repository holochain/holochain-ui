import * as React from 'react'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import {List, ListItem } from '@material-ui/core'
import MessageView from './messageView'
// import {Message as MessageType} from '../../types/message'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Send from '@material-ui/icons/Send'


const styles: StyleRulesCallback = (theme: Theme) => ({
  listItemMessage: {
    position: 'relative'
  },
  textField: {
    float: 'left',
    width: '80%'
  },
  button: {
    float: 'right',
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
})

interface MessagesProps {
  classes: any,
  messages: Array<any>
}

interface MessageState {
   message: string;
}

class Messages extends React.Component<MessagesProps, MessageState> {
  constructor(props: MessagesProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      message: 'Cat in the Hat'
    }
  }


  handleSendMessage = () =>   {
    console.log(this.state.message)
    // call holochain here.
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
     this.setState({message: e.target.value});
   }

  render () {
    const { classes, messages } = this.props
    return (
      <div>
        <div style={{overflow: 'auto'}}>
          <List>
            {
              messages.map((message: any, index: number) => (
                <ListItem key={index} dense={true} className={classes.listItemMessage}>
                  <MessageView message={message} />
                </ListItem>
              ))
            }
          </List>
        </div>
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
