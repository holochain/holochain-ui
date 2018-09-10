import { Component } from 'react'
import * as React from 'react'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import {List, ListItem, ListItemText, ListItemAvatar} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Highlight from '@material-ui/icons/Highlight'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import IconButton from '@material-ui/core/IconButton'
import IdeaContainer from '../../containers/ideaContainer'

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

function VoteControls (props: any) {
  const handleThumbsUp = () => {
    console.log('up')
    // this.togglePopover()
  }
  // handleThumbsDown = () => {
  //   console.log('down')
  //   // this.togglePopover()
  // }

  if (props.isHovered) {
    return (
      <div style={{position: 'absolute',top: -16,right: -9, width: 'auto', height:'auto', marginHorizontal:10, paddingHorizontal:10, marginVertical:0, backgroundColor:'white', border: 'thin solid lightgrey'} as React.CSSProperties}>
        <IconButton style={{minWidth: 25, width: 25, marginLeft:10,  marginRight:10}} onClick={handleThumbsUp} aria-label='ThumbUp'>
          <ThumbUp />
        </IconButton>
        <IconButton style={{minWidth: 25, width: 25, marginLeft:10,  marginRight:10}} aria-label='ThumbDown'>
          <ThumbDown />
        </IconButton>
        <IconButton style={{display: (props.message.type === 0) ? 'inline' : 'none', minWidth: 25, width: 25, marginLeft:10,  marginRight:10}} aria-label='Idea'>
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
  isHovered: boolean
}

class MessageView extends Component<MessageProps, MessageState> {
  constructor (props: MessageProps) {
    super(props)
    this.state = {
      isHovered: false
    }
    this.onMessageBlur = this.onMessageBlur.bind(this)
    this.onMessageHover = this.onMessageHover.bind(this)
  }

  onMessageHover (event: React.SyntheticEvent) {
    this.setState({ isHovered: true })
  }
  onMessageBlur (event: React.SyntheticEvent) {
    this.setState({ isHovered: false })
  }

  // style: function() {
  //       if (this.state.isHovered) {
  //         return { backgroundColor: "red" }
  //       } else {
  //         return { backgroundColor: "grey" }
  //       }
  //     }

  render () {
    const { classes, message } = this.props

    if(!message.author) {
      message.author = {
        handle: '?',
        avatar: ''
      }
    }

    return (
      <List
        style={{padding: 20,backgroundColor: (this.state.isHovered === true) ? '#f1f1f1' : 'white', }}
        dense={true} onMouseOver={this.onMessageHover} onMouseLeave={this.onMessageBlur}>
        <ListItem key={'1'} dense={true} >
          <ListItemAvatar >
            <Avatar style={{marginTop: 10}} alt={message.author.handle} src={message.author.avatar} />
          </ListItemAvatar>
          <ListItemText  className={classes.messageAuthor} primary={message.author.handle} />
          <VoteControls isHovered={this.state.isHovered} message={message} />
        </ListItem>
        <ListItem dense={true} className={classes.message}>
          <MessageComponent message={message} classes={classes} />
        </ListItem>
      </List>
    )
  }
}


export default withRoot(withStyles(styles)(MessageView))
