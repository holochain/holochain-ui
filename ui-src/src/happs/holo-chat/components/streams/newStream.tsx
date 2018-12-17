import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import withRoot from '../../../../withRoot'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'
<<<<<<< HEAD:ui-src/src/cells/holo-chat/components/channels/newChannel.tsx
import { ChannelSpec, Member } from '../../types/model/channel'
=======
import { Identity } from '../../types/model/identity'
import { StreamSpec, Member } from '../../types/model/stream'
>>>>>>> 31301f937a7a521001548d756711e45d6a8d5aa4:ui-src/src/happs/holo-chat/components/streams/newStream.tsx
import AgentList from './agentList'
import Send from '@material-ui/icons/Send'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  leftIcon: {
    marginRight: 0,
    marginLeft: -20
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    marginRight: -12
  },
  appBar: {
    position: 'sticky'
  },
  title: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit * 2
  }
})

interface OwnProps {
  classes?: any,
  open: boolean,
<<<<<<< HEAD:ui-src/src/cells/holo-chat/components/channels/newChannel.tsx
  members: Array<Member>,
  onSubmit: (spec: ChannelSpec) => void,
=======
  members: Array<Identity>,
  onSubmit: (spec: StreamSpec) => void,
>>>>>>> 31301f937a7a521001548d756711e45d6a8d5aa4:ui-src/src/happs/holo-chat/components/streams/newStream.tsx
  onHandleClose: () => void,
  isPublic: boolean
}

export interface State {
<<<<<<< HEAD:ui-src/src/cells/holo-chat/components/channels/newChannel.tsx
  selectedUsers: Array<Member>,
=======
  title: string,
  selectedUsers: Array<Identity>,
>>>>>>> 31301f937a7a521001548d756711e45d6a8d5aa4:ui-src/src/happs/holo-chat/components/streams/newStream.tsx
  open: boolean
}

export interface DispatchProps {
  getAllMembers: () => Promise<any>
}

export type Props = OwnProps & DispatchProps

class NewStream extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props)
    this.state = {
      title: '',
      selectedUsers: [],
      open: true
    }
  }

  componentDidMount () {
    this.props.getAllMembers()
    .catch(reason => { console.log(reason) })
  }
  onSelectionChanged = (selectedUsers: Array<Member>) => {
    this.setState({ selectedUsers })
  }

  handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value })
  }

  onCreateStreamButtonClick = () => {
    let streamName = ''
    if (this.state.title.length > 0) {
      streamName = this.state.title
    } else {
      streamName = this.state.selectedUsers.reduce((str, user, i) => {
        if (i < this.state.selectedUsers.length - 1) {
          return str + user.handle + ', '
        } else {
          return str + user.handle
        }
      }, '')
    }

<<<<<<< HEAD:ui-src/src/cells/holo-chat/components/channels/newChannel.tsx
    const channelSpec: ChannelSpec = {
      initial_members: this.state.selectedUsers.map((member: Member) => member.agentId),
      name: channelName,
=======
    const streamSpec: StreamSpec = {
      initial_members: this.state.selectedUsers.map((user): Member => { return { id: user.agentId } }),
      name: streamName,
>>>>>>> 31301f937a7a521001548d756711e45d6a8d5aa4:ui-src/src/happs/holo-chat/components/streams/newStream.tsx
      description: '',
      public: this.props.isPublic
    }
    this.props.onSubmit(streamSpec) // need to add a promise and push to the new streamAddress
  }

  render () {
    const { classes, members, isPublic } = this.props

    return (
      <Dialog fullWidth={true} open={this.props.open} aria-labelledby='simple-dialog-title'>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Button id='CloseDialog' onClick={this.props.onHandleClose} className={classes.button} color='inherit' aria-label='Close'>
              <CloseIcon className={classes.leftIcon}/>
            </Button>
            <Typography variant='h6' color='inherit' className={classes.title}>
              Members
            </Typography>
            <Button id='CreateStream' mini={true} onClick={this.onCreateStreamButtonClick} color='inherit' className={classes.button}>
              <Typography variant='h6' color='inherit'>
                Go
              </Typography>
              <Send className={classes.rightIcon}/>
            </Button>
          </Toolbar>
        </AppBar>
        {isPublic ? <TextField id='title' label='Title' className={classes.textField} value={this.state.title} onChange={this.handleChangeTitle} /> : null}
        <AgentList members={members} selectionChanged={this.onSelectionChanged}/>
      </Dialog>
    )
  }
}
export default withRoot(withStyles(styles)(NewStream))
