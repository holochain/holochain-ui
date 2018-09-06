import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import SpeakerPhone from '@material-ui/icons/SpeakerPhone'
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
  channels: Array<ChannelType>
  getMyChannels: () => void,
  newChannel: () => void
}

class Channels extends React.Component<ChannelsProps, {}> {
  componentDidMount() {
    console.log("get channels")
    // this.props.channelList()
  }

  // tslint:disable jsx-no-lambda
  render() {
    const {classes, channels} = this.props;
    return (<div className={classes.root}>
      <Button variant='fab' onClick={this.props.newChannel}/>
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
                  <ListItem id={channel.name} button={true} onClick={() => {history.push(`/holo-chat/messages`)}}>
                    <ListItemText primary={channel.name}/>
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
