import * as React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { withNotes } from '@storybook/addon-notes'
import listChannels from './layout.md'
import CreateStore from '../../../../store'
import Channels from '../channels/channels'
import Messages from '../messages/messages'
import * as constants from '../../constants'
import Grid from '@material-ui/core/Grid'

let store = CreateStore()

storiesOf('HoloChat', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Desktop Layout', withNotes(listChannels)(() => {
    return (
      <Provider store={store}>
      <Grid container={true} spacing={8}>
        <Grid item={true} xs={3}>
          <Channels channels={constants.channels} title={'Public Channels'} isPublic={true}/>
          <Channels channels={constants.channels} title={'Direct Messages'} isPublic={false}/>
        </Grid>
        <Grid item={true} xs={9}>
          <Messages messages={constants.messages} />
        </Grid>
      </Grid>
      </Provider>
    )
  }))
