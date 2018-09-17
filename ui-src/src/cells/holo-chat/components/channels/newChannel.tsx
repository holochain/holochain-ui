import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import withRoot from '../../../../withRoot';

import {Identity} from '../../types/model/identity'
import {ChannelSpec} from '../../types/model/channel'
import AgentList from './agentList'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing.unit,
  },
});

interface NewChannelProps {
  classes: any,
  open: boolean,
  users: Array<Identity>,
  onSubmit: (spec: ChannelSpec) => void
}

interface NewChannelState {
  selectedUsers: Array<Identity>
}

class NewChannel extends React.Component<NewChannelProps, NewChannelState> {

  constructor(props: NewChannelProps) {
    super(props)
    this.state = {
      selectedUsers: []
    }
  }

  componentDidMount() {
  }


  onSelectionChanged = (selectedUsers: Array<Identity>) => {
    console.log("selected users changed")
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
      <Dialog open={this.props.open} aria-labelledby="simple-dialog-title">
        <DialogTitle id="simple-dialog-title">Create Channel</DialogTitle>

        <Button color="primary" className={classes.button} onClick={this.onCreateChannelButtonClick}>
          Create
        </Button>
      
        <AgentList users={this.props.users} selectionChanged={this.onSelectionChanged}/>

      </Dialog>
    );
  }
}


export default withRoot(withStyles(styles)(NewChannel));
