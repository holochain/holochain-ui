import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withRoot from '../../../../withRoot';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {Identity} from '../../types/model/identity'
import {ChannelSpec} from '../../types/model/channel'
import AgentList from './agentList'
import Send from '@material-ui/icons/Send'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: 0,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  }
});

interface NewChannelProps {
  classes: any,
  open: boolean,
  users: Array<Identity>,
  onSubmit: (spec: ChannelSpec) => void,
  onHandleClose: () => void
}

interface NewChannelState {
  selectedUsers: Array<Identity>,
  open: boolean
}

class NewChannel extends React.Component<NewChannelProps, NewChannelState> {

  constructor(props: NewChannelProps) {
    super(props)
    this.state = {
      selectedUsers: [],
      open: true
    }
  }

  componentDidMount() {
  }


  onSelectionChanged = (selectedUsers: Array<Identity>) => {
    console.log('selected users changed')
    console.log(selectedUsers)
    this.setState({selectedUsers})
  }

  onCreateChannelButtonClick = () => {
    const channelName = this.state.selectedUsers.reduce((str, user, i) => {
      if(i < this.state.selectedUsers.length - 1) {
        return str + user.handle + ', '
      } else {
        return str + user.handle
      }
    }, '')

    const channelSpec: ChannelSpec = {
      members: this.state.selectedUsers.map(user => user.hash),
      name: channelName,
      description: ''
    }
    this.props.onSubmit(channelSpec)
  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog fullWidth={true} open={this.props.open} aria-labelledby='simple-dialog-title'>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Button id='CloseDialog' onClick={this.props.onHandleClose} color='inherit' aria-label='Close'>
              <CloseIcon />
            </Button>
            <Typography variant='title' color='inherit' className={classes.flex}>
              Members
            </Typography>
            <Button id='CreateChannel' variant='fab' mini={true} onClick={this.onCreateChannelButtonClick} className={classes.button}>
              <Send />
            </Button>
          </Toolbar>
        </AppBar>
        <AgentList users={this.props.users} selectionChanged={this.onSelectionChanged}/>
      </Dialog>
    );
  }
}


export default withRoot(withStyles(styles)(NewChannel));
