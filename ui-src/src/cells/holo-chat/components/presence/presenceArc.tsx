import * as React from 'react'
import { Arc } from 'react-konva'
import * as Konva from 'konva'
import { Arc as ArcType } from '../../types/arc'

type AppState = {
  color: string;
}

interface PresenceArcProps {
  classes: any,
  arc: ArcType,
  x: number,
  y: number,
  radius: number,
  strokeWidth: number
}

export class PresenceArc extends React.Component<PresenceArcProps, AppState> {
  constructor (props: PresenceArcProps) {
    super(props)

    this.state = {
      color: 'green'
    }

    setTimeout(() => {
      this.setState({ color: Konva.Util.getRandomColor() })
    }, 1000)
  }

  public render () {
    const { arc, x, y, radius, strokeWidth } = this.props
    return (
      <Arc
        x={x}
        y={y}
        innerRadius={radius}
        outerRadius={radius}
        rotation={arc.begin}
        angle={arc.duration}
        fill='green'
        stroke={arc.type === 1 ? 'green' : 'red'}
        strokeWidth={strokeWidth}
      />
    )
  }
}
