import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
// import { PresenceArc as PresenceArcType } from '../../types/channel'
import withRoot from '../../../../withRoot';
// import {Route} from 'react-router-dom'
import { Stage, Layer } from 'react-konva';
import { PresenceArc } from './presenceArc'
import { Arc as ArcType } from '../../types/arc'
// import Image from './24-hour-clock-face'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundImage: `url(${"http://localhost:3000/24-hour-clock-face.jpg"})`
    }
});

interface PresenceArcsProps {
  classes: any,
  arcs: Array<ArcType>
}

class PresenceArcs extends React.Component<PresenceArcsProps, {}> {
  componentDidMount() {
    console.log("get arcs")
    // this.props.channelList()
  }

  calculateRadius(index: number, arcsLength: number): number {
    var w = window.innerWidth / 2
    var h = window.innerHeight / 2
    var scale = Math.min(w, h) / (arcsLength + 2) * 0.7
    console.log(Math.max(index * scale - 25, 1))
    return index * scale
  }
  // tslint:disable jsx-no-lambda
  render() {
    const {classes, arcs} = this.props;
    return (<div className={classes.root}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {
            arcs.map((arc: ArcType, index: number) => (
              <PresenceArc classes={classes} arc={arc} radius={this.calculateRadius(index + 2, arcs.length)} x={window.innerWidth / 2} y={window.innerHeight / 2} />
            ))
          }
        </Layer>
      </Stage>
    </div>);
  }
}


export default withRoot(withStyles(styles)(PresenceArcs));
