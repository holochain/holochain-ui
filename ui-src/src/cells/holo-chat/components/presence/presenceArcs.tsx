import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
// import { PresenceArc as PresenceArcType } from '../../types/channel'
import withRoot from '../../../../withRoot';
// import {Route} from 'react-router-dom'
import { Stage, Layer } from 'react-konva';
import { ColouredArc } from './colouredArc'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

interface PresenceArcProps {
  classes: any,
  arcs: Array<any>
}

class PresenceArcs extends React.Component<PresenceArcProps, {}> {
  componentDidMount() {
    console.log("get channels")
    // this.props.channelList()
  }

  // tslint:disable jsx-no-lambda
  render() {
    const {classes} = this.props;
    return (<div className={classes.root}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <ColouredArc />
        </Layer>
      </Stage>
    </div>);
  }
}


export default withRoot(withStyles(styles)(PresenceArcs));
