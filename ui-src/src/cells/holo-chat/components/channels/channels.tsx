import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { Channel as ChannelType, ChannelSpec } from '../../types/model/channel'
import withRoot from '../../../../withRoot'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import NewChannel from '../../containers/newChannelContainer'
import { IdentitySpec } from '../../types/model/identity'
import ChannelNav from './channelNav'

import {
  GetMyChannels,
  CreateCustomChannel
} from '../../actions'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  addButton: {
    float: 'right'
  },
  title: {
    padding: theme.spacing.unit
  }
})

export interface OwnProps {
  classes?: any,
  isPublic: boolean,
  title: string,
  getSubjects: (channelAddress: string) => void,
}

export interface StateProps {
  channels: Array<ChannelType>
}

export interface DispatchProps {
  getMyChannels: typeof GetMyChannels.sig,
  newChannel: typeof CreateCustomChannel.sig,
  setActiveChannel: (channel: ChannelType) => void,
  setIdentity: (identity: IdentitySpec) => void
}

export interface RouterProps extends RouteComponentProps<{channel: string, subject?: string}> {}
export type Props = OwnProps & StateProps & DispatchProps

export interface State {
  modalOpen: boolean
}

class Channels extends React.Component<Props & RouterProps, State> {
  getChannelsInterval: any
  constructor (props: Props & RouterProps) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  componentDidMount () {
    this.getChannelsInterval = setInterval(this.props.getMyChannels, 20000)
  }

  componentWillUnmount () {
    clearInterval(this.getChannelsInterval)
  }

  handleNewChannelButtonClick = () => {
    this.setState({ modalOpen: true })
  }

  addNewChannel = (channelSpec: ChannelSpec) => {
    this.setState({ modalOpen: false })
    this.props.newChannel(channelSpec)
      .catch((err: Error) => {
        console.log(err)
      })
  }

  onHandleClose = () => {
    this.setState({ modalOpen: false })
  }

  getSubjects = (channelAddress: string) => {
    this.props.getSubjects(channelAddress)
  }

  render (): JSX.Element {
    const { classes, channels, title } = this.props
    return (
    <div className={classes.root}>
      <Button id='AddChannel' mini={true} onClick={this.handleNewChannelButtonClick} className={classes.addButton}>
        <AddIcon/>
      </Button>
      <Typography variant='h5' className={classes.title}>
        {title}
      </Typography>
      {channels.map((channel: ChannelType, index: number) => (
        <ChannelNav channel={channel} index={index} />
      ))}
      <NewChannel open={this.state.modalOpen} onSubmit={this.addNewChannel} onHandleClose={this.onHandleClose}/>
    </div>
    )
  }
}

// typecase after withRouter exposes only non-router props to external use. This is because withRouter will add those props automatically
export default withRoot(withStyles(styles)(withRouter(Channels)))
