import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withRoot from '../../../../withRoot';
import channelData from '../../../../../../data/channels.json'
import SpeakerPhone from '@material-ui/icons/SpeakerPhone'
import Channel from '../../types/channel'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

interface ChannelsProps {
  classes: any,
  channels: Array<Channel>
}

class Channels extends React.Component<ChannelsProps, {}> {
  componentDidMount() {
    console.log("get channels")
    // this.props.channelList()
  }

  // tslint:disable jsx-no-lambda
  render() {
    const {classes} = this.props;
    return (<div className={classes.root}>
      <Typography variant='display1'>
        Channels
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        {JSON.stringify(channelData)}
      </Typography>
      <List id="personas" component="nav">
        {
          channelData.map((channel: Channel, index: number) => (
            <ListItem id={channel.channel} button={true} onClick={() => {}}>
              <ListItemIcon>
                <SpeakerPhone/>
              </ListItemIcon>
              <ListItemText primary={channel.name}/>
            </ListItem>))
        }
      </List>
    </div>);
  }
}


export default withRoot(withStyles(styles)(Channels));
