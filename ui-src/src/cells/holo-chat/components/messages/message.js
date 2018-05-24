import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../../../../withRoot'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List'
import Badge from 'material-ui/Badge'
import Collapse from 'material-ui/transitions/Collapse'
import Popover from 'material-ui/Popover'
import Typography from 'material-ui/Typography'
import LightbulbOutline from 'material-ui-icons/LightbulbOutline'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import IconButton from 'material-ui/IconButton'
import Card, { CardMedia, CardContent } from 'material-ui/Card'
import IdeaCard from './ideaCard'

const styles = theme => ({
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
    fontSize: '0.62rem',
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

function VoteControls (props) {
  // handleThumbsUp = () => {
  //   console.log('up')
  //   // this.togglePopover()
  // }
  // handleThumbsDown = () => {
  //   console.log('down')
  //   // this.togglePopover()
  // }
  if (props.isHovered) {
    return (
      <div style={{position: 'absolute',top: -16,right: -9,width: 'auto', height:'auto', marginHorizontal:10, paddingHorizontal:10, marginVertical:0, backgroundColor:'white', border: 'thin solid lightgrey'}}>
        <IconButton    style={{display: (props.message.idea === true) ? 'inline' : 'none', minWidth: 25, width: 25, marginLeft:10,  marginRight:10}} aria-label='Idea'>
          <LightbulbOutline />
        </IconButton>
<IconButton style={{minWidth: 25, width: 25, marginLeft:10,  marginRight:10}} aria-label='ThumbUp'>
          <ThumbUp />
        </IconButton>
        <IconButton style={{minWidth: 25, width: 25, marginLeft:10,  marginRight:10}} aria-label='ThumbDown'>
          <ThumbDown />
        </IconButton>

      </div>
    )
  } else {
    return null
  }
}

function MessageComponent (props) {
  switch (props.message.type) {
    case 'Message':
      return (
        <div className={props.classes.message}>
          <Typography component='p' className={props.classes.messageText}>{props.message.content.text}</Typography>
          <img className={(props.message.content.image !== '') ?  props.classes.messageImage : props.classes.messageNoImage}  src={props.message.content.image} />
        </div>)
    case 'IdeaCard':
      return (
        <div className={props.classes.message}>
          <IdeaCard idea={props.message.content.idea} />
        </div>)
    default:
      return <div className={props.classes.message}><Typography component='p'>No message type found</Typography></div>
  }
}

class Message extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHovered: false
    }
    this.onMessageBlur = this.onMessageBlur.bind(this)
    this.onMessageHover = this.onMessageHover.bind(this)
  }

  onMessageHover (event) {
    this.setState({ isHovered: true })
  }
  onMessageBlur (event) {
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

    return (
      <List
        style={{padding: 20,backgroundColor: (this.state.isHovered === true) ? '#f1f1f1' : 'white', }}
        dense onMouseOver={this.onMessageHover} onMouseLeave={this.onMessageBlur}>
        <ListItem key={'1'} dense >
          <ListItemAvatar >
            <Avatar style={{marginTop: 10}} alt={message.author} src={message.avatar} />
          </ListItemAvatar>
          <ListItemText  className={classes.messageAuthor} primary={[message.author, message.time].join(' ')} />
          <VoteControls isHovered={this.state.isHovered} message={message} />
        </ListItem>
        <ListItem dense className={classes.message}>
          <MessageComponent message={message} classes={classes} />
        </ListItem>
        <Collapse in unmountOnExit>
          {message.replies.map((reply, index) => (
            <List dense className={classes.reply}>
              <ListItem key={'1'} dense>
                <ListItemAvatar>
                  <Avatar alt={reply.author} src={reply.avatar} />
                </ListItemAvatar>
                <ListItemText className={classes.messageAuthor} primary={[message.author, message.time].join(' ')} />
              </ListItem>
              <ListItem dense className={classes.message}>
                <MessageComponent message={reply} classes={classes} />
              </ListItem>
            </List>
          ))}
        </Collapse>
      </List>
    )
  }
}

Message.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Message))
