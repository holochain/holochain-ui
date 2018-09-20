import { Component } from 'react'
import * as React from 'react'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import {List, ListItem, ListItemText, ListItemAvatar} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Highlight from '@material-ui/icons/Highlight'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import IconButton from '@material-ui/core/IconButton'
import IdeaContainer from '../../containers/ideaContainer'
import {MakeAvatar} from '../misc/makeAvatar'

import {Message as MessageType} from '../../types/view/message'

const styles: StyleRulesCallback = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    minWidth: 25,
    width: 25
  },
  card: {
    minWidth: 200,
    maxWidth: 400,
    display: 'flex',
    marginLeft: 100
  },
  media: {
    height: 100
  },
  reply: {
    marginLeft: theme.spacing.unit * 5
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  popover: {
    pointerEvents: 'none'
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  message: {
    marginLeft: 19,
    marginTop: -8,

  },
  messageText: {
    marginLeft: 19,
    marginTop: -8,
    fontSize: '16',
    margin: 0,
    whiteSpace: 'pre-wrap',
    width: '100%',
    wordBreak: 'break-word',
    color: 'rgb(61, 60, 64)',
  },
  messageAuthor:{
    fontSize:14,
    color:'lightgrey'
  },
  messageImage:{
    maxWidth:200,
    display: 'inline',
    marginLeft: 19,
    marginTop:  5,
    borderRadius:10
  },
  messageNoImage:{
    display: 'none'
  },
  votingIcon:{
    color:'blue'
  }
})

function VoteControls (props: MessageState & {handleIdea: Function}) {
  const handleThumbsUp = () => {
    console.log('up')
  }

  const handleThumbsDown = () => {
    console.log('down')
  }

  if (props.isHovered) {
    return (
      <div style={{position: 'absolute',top: -16,right: -9, width: 'auto', height:'auto', marginHorizontal:10, paddingHorizontal:10, marginVertical:0, backgroundColor:'white', border: 'thin solid lightgrey'} as React.CSSProperties}>
        <IconButton style={{minWidth: 25, width: 25, marginLeft:10,  marginRight:10}} onClick={handleThumbsUp} aria-label='ThumbUp'>
          <ThumbUp />
        </IconButton>
        <IconButton onClick={handleThumbsDown} style={{minWidth: 25, width: 25, marginLeft:10,  marginRight:10}} aria-label='ThumbDown'>
          <ThumbDown />
        </IconButton>
        <IconButton onClick={() => props.handleIdea(props.message)} style={{display: (props.message.type === 0) ? 'inline' : 'none', minWidth: 25, width: 25, marginLeft:10,  marginRight:10}} aria-label='Idea' >
          <Highlight />
        </IconButton>
      </div>
    )
  } else {
    return null
  }
}

function MessageComponent (props: any) {

  switch (props.message.type) {
    case 0:
      return (
        <div className={props.classes.message}>
          <Typography className={props.classes.messageText}>{props.message.content.text}</Typography>
          <img alt={props.message.content.image} className={(props.message.content.image !== '') ?  props.classes.messageImage : props.classes.messageNoImage}  src={props.message.content.image} />
          <List>
            {
              props.message.replies.map((message: any, index: number) => (
                <ListItem key={index} dense={true} className={props.classes.listItemMessage}>
                  <Typography className={props.classes.messageText}>{message.content.text}</Typography>
                </ListItem>
              ))
            }
          </List>
        </div>)
    case 1:
      return (
        <div className={props.classes.message}>
          <IdeaContainer idea={props.message.content} />
        </div>)
    default:
      return <div className={props.classes.message}><Typography component='p'>No message type found</Typography></div>
  }
}

interface MessageProps {
  classes: any,
  message: MessageType & {avatar: string}
}

interface MessageState {
  isHovered: boolean,
  message: MessageType & {avatar: string}
}

class MessageView extends Component<MessageProps, MessageState> {
  constructor (props: MessageProps) {
    super(props)
    this.state = {
      isHovered: false,
      message: {
        type: 0,
        author: 'Phil',
        channelId: 'holochain',
        timestamp: 10,
        content: {
          text: 'Hey Micah, how are you doing?',
        },
        replies: []
      },
    }
    this.onMessageBlur = this.onMessageBlur.bind(this)
    this.onMessageHover = this.onMessageHover.bind(this)
  }

  componentDidMount() {
    if(!this.props.message.author) {
      this.props.message.author = {
        handle: '?',
        avatar: ''
      }
    }
    this.setState({ message: this.props.message })
  }

  onMessageHover () {
    this.setState({ isHovered: true })
  }
  onMessageBlur () {
    this.setState({ isHovered: false })
  }

  onHandleIdea = (message: MessageType) => {
    message.type = 1
    message.content = {
      upVotes: 33,
      downVotes: 0,
      description: 'Just turned into an Idea.',
      avatar: '',
      productOwner: 'Phil',
      title: 'New Idea'
    }
    console.log(message.type)
    this.setState({ message: message })
  }

  render () {
    const { classes, message } = this.props

    return (
      <List
        style={{padding: 20,backgroundColor: (this.state.isHovered === true) ? 'white' : 'white', }}
        dense={true} onMouseOver={this.onMessageHover} onMouseLeave={this.onMessageBlur} onTouchStart={this.onMessageHover}>
        <ListItem key={'1'} dense={true} >
          <ListItemAvatar >
            <MakeAvatar user={this.state.message.author}/>
          </ListItemAvatar>
          <ListItemText  className={classes.messageAuthor} primary={this.state.message.author.handle} />
          <VoteControls isHovered={this.state.isHovered} message={this.state.message} handleIdea={() => this.onHandleIdea(message)} />
        </ListItem>
        <ListItem dense={true} className={classes.message}>
          <MessageComponent message={this.state.message} classes={classes} />
        </ListItem>
      </List>
    )
  }
}


export default withRoot(withStyles(styles)(MessageView))
