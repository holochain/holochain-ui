import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'

import NewChannel from './newChannel'

storiesOf('HoloChat/Channels', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Displays unfiltered list with add button', () => {
    return <NewChannel open={true} users={[{ hash: '12334', handle: 'wollum', avatar: '' }, { hash: '1233', handle: 'Sarah', avatar: '' }, { hash: '1234', handle: 'Nicksmith', avatar: '' }]}/>
  })
