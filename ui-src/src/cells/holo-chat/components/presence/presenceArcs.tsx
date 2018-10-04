import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
// import { PresenceArc as PresenceArcType } from '../../types/channel'
import withRoot from '../../../../withRoot'
// import {Route} from 'react-router-dom'
import { Stage, Layer } from 'react-konva'
import { PresenceArc } from './presenceArc'
import { Arc as ArcType } from '../../types/arc'
// import Image from './24-hour-clock-face'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundImage: `url(${'http://localhost:3000/24-hour-clock-face.jpg'})`,
    margin: '0 auto'
  }
})

interface PresenceArcsProps {
  classes: any,
  strokeWidth: number,
  arcs: Array<ArcType>
}

class PresenceArcs extends React.Component<PresenceArcsProps, {}> {
  componentDidMount () {
    console.log('get arcs')
    // this.props.channelList()
  }

  calculateRadius (index: number, arcsLength: number, width: number, height: number): number {
    let w = width / 2
    let h = height / 2
    let scale = Math.min(w, h) / (arcsLength)
    return index * scale * 0.65
  }
  getSize (dir: string): number {
    // var container = document.querySelector('#stage-parent')!
    //
    // // now we need to fit stage into parent
    // var containerWidth = container.clientWidth;
    // console.log(containerWidth)
    return 300
  }

  filterArcs (arcType: number, arcs: Array<ArcType>): Array<ArcType> {
    return arcs.filter(arc => arc.type === arcType)
  }

  numberMembers (): number {
    console.log(this.filterArcs(1, this.props.arcs).length)
    return this.filterArcs(1, this.props.arcs).length
  }
  // tslint:disable jsx-no-lambda
  render () {
    const { classes, arcs, strokeWidth } = this.props
    return (
      <div className={classes.root} id='stage-parent'>
        <Stage width={window.innerWidth} height={this.getSize('h')}>
          <Layer>
            {
              this.filterArcs(1, arcs).map((arc: ArcType, index: number) => (
                <PresenceArc key={index} classes={classes} arc={arc} radius={this.calculateRadius(arc.index, this.numberMembers(), window.innerWidth, this.getSize('h'))} strokeWidth={strokeWidth} x={window.innerWidth / 2} y={this.getSize('h') / 2} />
              ))
            }
          </Layer>
          <Layer>
            {
              this.filterArcs(0, arcs).map((arc: ArcType, index: number) => (
                <PresenceArc key={index} classes={classes} arc={arc} radius={this.calculateRadius(arc.index, this.numberMembers(), window.innerWidth, this.getSize('h'))} strokeWidth={strokeWidth} x={window.innerWidth / 2} y={this.getSize('h') / 2} />
              ))
            }
          </Layer>
        </Stage>
      </div>)
  }
}

export default withRoot(withStyles(styles)(PresenceArcs))
