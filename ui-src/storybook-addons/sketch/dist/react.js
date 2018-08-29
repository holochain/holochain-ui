import React from 'react';
import PropTypes from 'prop-types';
import addons from '@storybook/addons';

export class Sketch extends React.Component {
  render() {
    const { children, img } = this.props;
    const channel = addons.getChannel();

    // send the notes to the channel.
    channel.emit('storybook/sketch/add_sketch', img);
    // return children elements.
    return children;
  }
}

Sketch.propTypes = {
  children: PropTypes.node,
  img: PropTypes.string
};
Sketch.defaultProps = {
  children: null,
  img: ''
};