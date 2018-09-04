import * as React from 'react'
// import {Provider} from 'react-redux'
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from 'react-router'
import { withNotes } from '@storybook/addon-notes'
import {configure} from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import presenceArcsNotes from './presenceArcs.notes.md'
import {specs} from 'storybook-addon-specifications'
import { presenceArcsTests } from './presenceArcs.test'
import PresenceArcs from './presenceArcs'
// import channelData from '../../data/channels.json'


configure({adapter: new Adapter()})
// let store = CreateStore()

// function StartComponent () {
//     return (
//       <div>Starting point</div>
//     )
// }

storiesOf('HoloChat/Presence', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Arcs of Presence', withNotes(presenceArcsNotes) (() => {
    specs(() => presenceArcsTests)
      return <PresenceArcs />
  }))
