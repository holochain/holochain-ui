import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import withRoot from '../../../../withRoot'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { Identity } from '../../types/model/identity'
import { ChannelSpec } from '../../types/model/channel'
import AgentList from './agentList'
import Send from '@material-ui/icons/Send'

import {
  GetAllMembers
} from '../../actions'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing.unit
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
  }
})

interface OwnProps {
  classes?: any,
  open: boolean,
  users: Array<Identity>,
  onSubmit: (spec: ChannelSpec) => void,
  onHandleClose: () => void,
  isPublic: boolean
}

export interface State {
  selectedUsers: Array<Identity>,
  open: boolean
}

export interface DispatchProps {
  getAllMembers: typeof GetAllMembers.sig
}

export type Props = OwnProps & DispatchProps

class NewChannel extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props)
    this.state = {
      selectedUsers: [],
      open: true
    }
  }

  componentDidMount () {
    this.props.getAllMembers(null)
    .catch(reason => { console.log(reason) })
  }
  onSelectionChanged = (selectedUsers: Array<Identity>) => {
    this.setState({ selectedUsers })
  }

  onCreateChannelButtonClick = () => {
    const channelName = this.state.selectedUsers.reduce((str, user, i) => {
      if (i < this.state.selectedUsers.length - 1) {
        return str + user.handle + ', '
      } else {
        return str + user.handle
      }
    }, '')

    const channelSpec: ChannelSpec = {
      members: this.state.selectedUsers.map(user => user.hash),
      name: channelName,
      description: '',
      isPublic: this.props.isPublic
    }
    this.props.onSubmit(channelSpec)
  }

  render () {
    const { classes, users } = this.props

    return (
      <Dialog fullWidth={true} open={this.props.open} aria-labelledby='simple-dialog-title'>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Button id='CloseDialog' onClick={this.props.onHandleClose} color='inherit' aria-label='Close'>
              <CloseIcon className={classes.leftIcon}/>
            </Button>
            <Typography variant='h6' color='inherit' className={classes.title}>
              Members
            </Typography>
            <Button id='CreateChannel' mini={true} onClick={this.onCreateChannelButtonClick} color='inherit' className={classes.button}>
              <Typography variant='h6' color='inherit'>
                Go
              </Typography>
              <Send className={classes.rightIcon}/>
            </Button>
          </Toolbar>
        </AppBar>
        <AgentList users={users} selectionChanged={this.onSelectionChanged}/>
      </Dialog>
    )
  }
}
export default withRoot(withStyles(styles)(NewChannel))
