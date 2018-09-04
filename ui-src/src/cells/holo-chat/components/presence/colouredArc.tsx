import * as React from 'react'
import { Arc } from 'react-konva';
import * as Konva from 'konva';

type AppState = {
    color: string;
}

export class ColouredArc extends React.Component<{}, AppState> {
  constructor(props : {}) {
      super(props);

      this.state = {
          color: 'green'
      };

      setTimeout(() => {
          this.setState({ color: Konva.Util.getRandomColor() });
      }, 1000);
  }

  public render() {
    return (
      <Arc
        x={20}
        y={20}
        innerRadius = {40}
        outerRadius = {70}
        angle = {60}
        fill = 'yellow'
        stroke = 'black'
        strokeWidth = {4}
      />
    );
  }
}
