import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withRoot from '../../../../withRoot';

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

interface NewChannelProps {
  classes: any
}

class NewChannel extends React.Component<NewChannelProps, {}> {
  componentDidMount() {
    console.log("get personas")
    // this.props.channelList()
  }

  // tslint:disable jsx-no-lambda
  render() {
    const {classes} = this.props;
    return (<div className={classes.root}>
      <Typography variant='display1'>
        New Channel Lucy
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        The New Channel view shows an empty list until you start to filter the list
      </Typography>

    </div>);
  }
}


export default withRoot(withStyles(styles)(NewChannel));
