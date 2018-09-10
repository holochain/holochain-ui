import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add'
import { Channel as ChannelType } from '../../types/view/channel'
import withRoot from '../../../../withRoot';
import {Route} from 'react-router-dom'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

interface ChannelsProps {
  classes: any,
  channels: Array<ChannelType>,

  getMyChannels: () => void,
  newChannel: () => void,
  setActiveChannel: (channel: ChannelType) => void
}

class Channels extends React.Component<ChannelsProps, {}> {
  getChannelsInterval: any

  componentDidMount() {
    console.log("get channels")
    this.getChannelsInterval = setInterval(this.props.getMyChannels, 200)
  }

  componentWillUnmount() {
    clearInterval(this.getChannelsInterval)
  }

  handleNewChannelButtonClick = () => {
    this.props.newChannel()
  }

  handleChannelListClick = (history: any, channel: ChannelType) => {
    this.props.setActiveChannel(channel)
    history.push(`/holo-chat/messages`)
  }

  // tslint:disable jsx-no-lambda
  render() {
    const {classes, channels} = this.props;
    return (<div className={classes.root}>
      <Button variant='fab' onClick={this.handleNewChannelButtonClick}>
      <AddIcon/>
      </Button>
      <Typography variant='display1'>
        Channels
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        Here's your Channels
      </Typography>
      <List id="channels" component="nav">
        {
          channels.map((channel: ChannelType, index: number) => (
                <Route render={({history}) => (
                  <ListItem id={channel} button={true} onClick={() => this.handleChannelListClick(history, channel)}>
                    <ListItemText primary={channel}/>
                  </ListItem>
                )
              }
            />
          ))
        }
      </List>
    </div>);
  }
}


export default withRoot(withStyles(styles)(Channels));
