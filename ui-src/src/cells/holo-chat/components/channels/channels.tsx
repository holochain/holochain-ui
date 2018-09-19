import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'

// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add'
import { Channel as ChannelType, ChannelSpec } from '../../types/model/channel'
import {Profile} from '../../../holo-vault/types/profile'
import withRoot from '../../../../withRoot';
import {Route, RouteComponentProps} from 'react-router-dom'

import NewChannel from '../../containers/newChannelContainer'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  addButton: {
    float: 'right'
  }
});

interface ChannelsProps extends RouteComponentProps<{}> {
  classes: any,
  channels: Array<ChannelType>,
  profiles: Array<Profile>,

  getMyChannels: () => void,
  newChannel: (channelSpec: ChannelSpec) => void,
  setActiveChannel: (channel: ChannelType) => void,
  getUsers: () => void,
  getProfiles: (then: Function) => void
}

interface ChannelsState {
  modalOpen: boolean
}

class Channels extends React.Component<ChannelsProps, ChannelsState> {
  getChannelsInterval: any
  constructor(props: ChannelsProps) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  componentDidMount() {
    console.log("get channels")
    // here is where we should check that there is a valid profile

    this.props.getProfiles(() => {
      const chatProfileExists = this.props.profiles.some((profile) => {
        console.log(profile)
        return profile.name === "holoChat"
      })

      if(chatProfileExists) {
        console.log("Chat profile found!")
      } else {
        console.log("No Profile for chat. Redirecting...")
        this.props.history.push("/holo-vault/profiles")
      }
    })

    this.getChannelsInterval = setInterval(this.props.getMyChannels, 200)
  }

  componentWillUnmount() {
    clearInterval(this.getChannelsInterval)
  }

  handleNewChannelButtonClick = () => {
    this.props.getUsers()
    this.setState({modalOpen: true})
  }

  addNewChannel = (channelSpec: ChannelSpec) => {
    this.props.newChannel(channelSpec)
    this.setState({modalOpen: false})
  }

  onHandleClose = () => {
    this.setState({modalOpen: false})
  }

  handleChannelListClick = (history: any, channel: ChannelType) => {
    this.props.setActiveChannel(channel)
    history.push(`/holo-chat/messages`)
  }

  render() {
    const {classes, channels} = this.props;
    return (<div className={classes.root}>
      <Button variant='fab' mini={true} onClick={this.handleNewChannelButtonClick} className={classes.addButton}>
        <AddIcon/>
      </Button>
      <Typography variant='display1'>
        Channels
      </Typography>
      <List id="channels" component="nav">
        {
          channels.map((channel: ChannelType, index: number) => (
                <Route key={index} render={({history}) => (
                  <ListItem id={channel.hash} button={true} onClick={() => this.handleChannelListClick(history, channel)}>
                    <ListItemText primary={channel.name}/>
                  </ListItem>
                )
              }
            />
          ))
        }
      </List>
      <NewChannel open={this.state.modalOpen} onSubmit={this.addNewChannel} onHandleClose={this.onHandleClose}/>
    </div>);
  }
}


export default withRoot(withStyles(styles)(withRouter(Channels)));
