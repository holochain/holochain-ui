import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import withRoot from '../../../../withRoot';

import {Identity} from '../../types/model/identity'
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
  users: Array<Identity>
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
    this.setState({selectedUsers})
  }

  render() {
    const {classes} = this.props;
    return (<div className={classes.root}>
      <Typography variant='display1'>
        New Channel
      </Typography>
      <Button color="primary" className={classes.button}>
        Create
      </Button>
      
      <AgentList users={this.props.users} selectionChanged={this.onSelectionChanged}/>

    </div>);
  }
}


export default withRoot(withStyles(styles)(NewChannel));
