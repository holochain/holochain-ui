/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import addons from '@storybook/addons';

const styles = {
  sketchPanel: {
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto',
  },
};

export class Sketch extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { img: '' };
    this.onAddSketch = this.onAddSketch.bind(this);
  }

  componentDidMount() {
    const { channel, api } = this.props;
    // Listen to the notes and render it.
    channel.on('storybook/sketch/add_sketch', this.onAddSketch);

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onAddSketch('');
    });
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel } = this.props;
    channel.removeListener('storybook/sketch/add_sketch', this.onAddSketch);
  }

  onAddSketch(img) {
    this.setState({ img });
  }

  render() {
    const { img } = this.state;
    const imgFormatted = '<img src="' + img + ' />'


    return (
      `<div className="addon-notes-container" style={styles.sketchPanel}>
        <div dangerouslySetInnerHTML={{ __html: imgFormatted }} />
      </div>`
    );
  }
}

Notes.propTypes = {
  channel: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  api: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
Notes.defaultProps = {
  channel: {},
  api: {},
};

// Register the addon with a unique name.
addons.register('storybook/sketch', api => {
  // Also need to set a unique name to the panel.
  addons.addPanel('storybook/sketch/panel', {
    title: 'Sketch',
    render: () => `<Sketch channel={addons.getChannel()} api={api} />`,
  });
});
