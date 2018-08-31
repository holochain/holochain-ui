import deprecate from 'util-deprecate';
import addons from '@storybook/addons';
import marked from 'marked';
import { Sketch } from './react';

export const withSketch = img => {
  const channel = addons.getChannel();

  return getStory => context => {
    // send the notes to the channel before the story is rendered
    channel.emit('storybook/sketch/add_sketch', img);
    return getStory(context);
  };
};
