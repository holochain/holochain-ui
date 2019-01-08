import * as React from 'react'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
// import Highlight from '@material-ui/icons/Highlight'
// import ThumbUp from '@material-ui/icons/ThumbUp'
// import ThumbDown from '@material-ui/icons/ThumbDown'
// import IconButton from '@material-ui/core/IconButton'
// import IdeaContainer from '../../containers/ideaContainer'
import MakeAvatar from '../misc/makeAvatar'
import { Member } from '../../types/model/stream'
import { Message as MessageType } from '../../types/model/message'

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
    backgroundColor: theme.palette.background.paper
  },
  messageText: {
    marginLeft: 19,
    marginTop: -8,
    fontSize: '16',
    margin: 0,
    whiteSpace: 'pre-wrap',
    width: '100%',
    wordBreak: 'break-word',
    color: theme.palette.primary.contrastText
  },
  messageAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.palette.primary.contrastText
  },
  messageImage: {
    maxWidth: 200,
    display: 'inline',
    marginLeft: 19,
    marginTop:  5,
    borderRadius: 10
  },
  messageNoImage: {
    display: 'none'
  },
  votingIcon: {
    color: 'blue'
  }
})

// function VoteControls (props: MessageState & {handleIdea: Function}) {
//   const handleThumbsUp = () => {
//     console.log('up')
//   }
//
//   const handleThumbsDown = () => {
//     console.log('down')
//   }
//
//   if (props.isHovered) {
//     return (
//       <div style={{ position: 'absolute',top: -16,right: -9, width: 'auto', height: 'auto', marginHorizontal: 10, paddingHorizontal: 10, marginVertical: 0, backgroundColor: 'white', border: 'thin solid lightgrey' } as React.CSSProperties}>
//         <IconButton style={{ minWidth: 25, width: 25, marginLeft: 10, marginRight: 10 }} onClick={handleThumbsUp} aria-label='ThumbUp'>
//           <ThumbUp />
//         </IconButton>
//         <IconButton onClick={handleThumbsDown} style={{ minWidth: 25, width: 25, marginLeft: 10, marginRight: 10 }} aria-label='ThumbDown'>
//           <ThumbDown />
//         </IconButton>
//         <IconButton onClick={() => props.handleIdea(props.message)} style={{ display: (props.message.message_type === 'idea') ? 'inline' : 'none', minWidth: 25, width: 25, marginLeft: 10, marginRight: 10 }} aria-label='Idea' >
//           <Highlight />
//         </IconButton>
//       </div>
//     )
//   } else {
//     return null
//   }
// }

function MessageComponent (props: any) {

  switch (props.message.message_type) {
    case 'text':
      return (
        <div className={props.classes.message}>
          <Typography className={props.classes.messageText}>{props.message.payload}</Typography>
        </div>)
    case 1:
      return (
        <div className={props.classes.message}>
          <Typography component='p'>Idea</Typography>
        </div>)
    default:
      return <div className={props.classes.message}><Typography component='p'>No message type found</Typography></div>
  }
}

interface OwnProps {
  classes: any,
  message: MessageType & {avatar: string},
  member: Member
}

interface State {
  isHovered: boolean,
  message: MessageType & {avatar: string}
}

class MessageView extends React.Component<OwnProps, State> {
  constructor (props: OwnProps) {
    super(props)
    this.state = {
      isHovered: false,
      message: this.props.message
    }
    this.onMessageBlur = this.onMessageBlur.bind(this)
    this.onMessageHover = this.onMessageHover.bind(this)
  }

  componentDidMount () {
    this.setState({ message: this.props.message })
  }

  onMessageHover () {
    this.setState({ isHovered: true })
  }
  onMessageBlur () {
    this.setState({ isHovered: false })
  }

  render () {
    const { classes, member, message } = this.props

    return (
      <List>
        <ListItem key={'1'} dense={true} >
        <ListItemAvatar><MakeAvatar member={member} /></ListItemAvatar>
          <ListItemText className={classes.messageAuthor} primary={member.handle} secondary={new Date(message.timestamp).toLocaleTimeString('en-US')} />
        </ListItem>
        <ListItem dense={true} className={classes.message}>
          <MessageComponent message={message} classes={classes} />
        </ListItem>
      </List>
    )
  }
}

export default withRoot(withStyles(styles)(MessageView))
