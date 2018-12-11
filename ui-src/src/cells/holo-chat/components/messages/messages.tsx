import * as React from 'react'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import { List, ListItem } from '@material-ui/core'
import MessageView from './messageView'
import { Message as MessageType, MessageSpec } from '../../types/model/message'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Send from '@material-ui/icons/Send'

const updateInterval = 1000

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '95%',
    boxShadow: 'none'
  },
  listItemMessage: {
    position: 'relative',
    marginTop: '10px'
  },
  textField: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing.unit
  },
  send: {
    width: '60%',
    position: 'fixed',
    bottom: 0,
    boxShadow: 'none',
    backgroundColor: theme.palette.background.paper,
    height: 140
  },
  chatHistory: {
    height: '100%',
    overflow: 'auto',
    marginBottom: 120,
    boxShadow: 'none'
  }
})

export interface OwnProps {
  classes: any
}

export interface StateProps {
  messages: Array<MessageType>,
  channelAddress: string,
  subjectAddress: string
}

export interface DispatchProps {
  getMessages: (address: string) => void,
  sendMessage: (payload: {channel_address: string, subjects: [string], message: MessageSpec}) => void
}

export interface State {
  message: string
  subject: string
}

export type Props = OwnProps & StateProps & DispatchProps

export interface RouterProps extends RouteComponentProps<{channel: string, subject: string}> {}

class Messages extends React.Component<Props & RouterProps, State> {
  getMessageInterval: any

  componentDidMount () {

    this.getMessageInterval = setInterval(() => {
      if (this.props.subjectAddress) {
        // console.log('this.props.subjectAddress' + this.props.subjectAddress)
        this.props.getMessages(this.props.subjectAddress)
        console.log(this.props.messages)
      } else if (this.props.channelAddress) {
        // console.log('this.props.channelAddress' + this.props.channelAddress)
        this.props.getMessages(this.props.channelAddress)
      }
    }, updateInterval)
  }

  componentWillUnmount () {
    clearInterval(this.getMessageInterval)
  }

  constructor (props: Props & RouterProps) {
    super(props)
    this.state = {
      message: '',
      subject: ''
    }
  }

  handleSendMessage = () => {
    console.log({
      channel_address: this.props.channelAddress,
      subjects: [this.state.subject],
      message: {
        message_type: 'text',
        payload: this.state.message,
        meta: '{}'
      }
    })
    this.props.sendMessage({
      channel_address: this.props.channelAddress,
      subjects: [this.state.subject],
      message: {
        message_type: 'text',
        payload: this.state.message,
        meta: '{}'
      }
    })
    this.setState({ message: '' })
  }

  handleChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ subject: e.target.value })
  }

  handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: e.target.value })
  }

  handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.handleSendMessage()
    }
  }

  render () {
    const { classes, messages } = this.props

    return (
      <Paper className={classes.root}>
        <Paper className={classes.chatHistory}>
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
        <Paper className={classes.send}>
          <Grid container={true} spacing={0}>
            <Grid item={true} xs={11}>
              <TextField
                  id='subject'
                  label='Subject'
                  className={classes.textField}
                  value={this.state.subject}
                  onChange={this.handleChangeSubject}
                  margin='normal'
                  onKeyPress={this.handleKeyPress}
              />
              <TextField
                  id='message'
                  label='Message'
                  className={classes.textField}
                  value={this.state.message}
                  onChange={this.handleChangeMessage}
                  margin='normal'
                  onKeyPress={this.handleKeyPress}
              />
            </Grid>
            <Grid item={true} xs={1}>
              <Button variant='fab' mini={true} className={classes.button} onClick={this.handleSendMessage}>
                <Send />
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    )
  }
}

export default withRoot(withStyles(styles)(withRouter(Messages)))
