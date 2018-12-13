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
import { StreamSpec, Member } from '../../types/model/stream'
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
  }
})

interface OwnProps {
  classes?: any,
  open: boolean,
  members: Array<Identity>,
  onSubmit: (spec: StreamSpec) => void,
  onHandleClose: () => void,
  isPublic: boolean
}

export interface State {
  selectedUsers: Array<Identity>,
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
      selectedUsers: [],
      open: true
    }
  }

  componentDidMount () {
    this.props.getAllMembers()
    .catch(reason => { console.log(reason) })
  }
  onSelectionChanged = (selectedUsers: Array<Identity>) => {
    this.setState({ selectedUsers })
  }

  onCreateStreamButtonClick = () => {
    const streamName = this.state.selectedUsers.reduce((str, user, i) => {
      if (i < this.state.selectedUsers.length - 1) {
        return str + user.handle + ', '
      } else {
        return str + user.handle
      }
    }, '')

    const streamSpec: StreamSpec = {
      initial_members: this.state.selectedUsers.map((user): Member => { return { id: user.agentId } }),
      name: streamName,
      description: '',
      public: this.props.isPublic
    }
    this.props.onSubmit(streamSpec) // need to add a promise and push to the new streamAddress
  }

  render () {
    const { classes, members } = this.props

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
        <AgentList members={members} selectionChanged={this.onSelectionChanged}/>
      </Dialog>
    )
  }
}
export default withRoot(withStyles(styles)(NewStream))
