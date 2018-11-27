import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { Channel as ChannelType, ChannelSpec } from '../../types/model/channel'
import withRoot from '../../../../withRoot'
import { withRouter, Route, RouteComponentProps } from 'react-router-dom'
import NewChannel from '../../containers/newChannelContainer'
import { IdentitySpec } from '../../types/model/identity'
import { Subject as SubjectType } from '../../types/model/subject'
import Badge from '@material-ui/core/Badge'

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
  },
  badge: {
    top: -5,
    right: -5,
    // The border color match the background color.
    border: `2px solid`
  },
  chip: {
    margin: 2
  }
})

export interface OwnProps {
  classes?: any,
  isPublic: boolean,
  title: string,
  getSubjects: (channelAddress: string) => void,
}

export interface StateProps {
  channels: Array<ChannelType>,
  subjects: Array<SubjectType>
}

export interface DispatchProps {
  getMyChannels: typeof GetMyChannels.sig,
  newChannel: typeof CreateCustomChannel.sig,
  setActiveChannel: (channel: ChannelType) => void,
  setIdentity: (identity: IdentitySpec) => void,
  getSubjects: (channelAddress: string) => void
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
    this.getChannelsInterval = setInterval(this.props.getMyChannels, 60000)
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
    console.log(`get subjects for ${channelAddress}`)
    this.props.history.push(`/holo-chat/channel/${channelAddress}`)
    this.props.getSubjects(channelAddress)
  }

  formatSubjectLabel = (subject: string): string => {
    return `${subject.substr(0, 15)}...`
  }

  render (): JSX.Element {
    const { classes, channels, title, subjects, isPublic } = this.props
    return (
    <div className={classes.root}>
      <Button id='AddChannel' mini={true} onClick={this.handleNewChannelButtonClick} className={classes.addButton}>
        <AddIcon/>
      </Button>
      <Typography variant='h5' className={classes.title}>
        {title}
      </Typography>
        {channels.filter(function (channel: ChannelType) {
          return channel.isPublic === isPublic
        }).map((channel: ChannelType, index: number) => (
        <div key={index} className={classes.root}>
            <Route
              render={ ({ history }) => (
                <ExpansionPanel style={{ boxShadow: 'none' }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => this.getSubjects(channel.hash)}>
                    <Typography variant='h6'>{channel.name}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                      {
                        subjects.filter(function (subject: SubjectType) {
                          return subject.channelAddress === channel.hash
                        }).map((subject: SubjectType, subjectIndex: number) => (
                          <Badge badgeContent={subject.unread} color='primary' classes={{ badge: classes.badge }}>
                            <Chip
                              key={subjectIndex}
                              label={this.formatSubjectLabel(subject.subject)}
                              className={classes.chip}
                              onClick={() => history.push(`/holo-chat/channel/${channel.hash}/subject/${subject.address}`)}
                            />
                          </Badge>
                          ))
                      }
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                )}
            />
        </div>
      ))}
      <NewChannel open={this.state.modalOpen} onSubmit={this.addNewChannel} onHandleClose={this.onHandleClose}/>
    </div>
    )
  }
}

// typecase after withRouter exposes only non-router props to external use. This is because withRouter will add those props automatically
export default withRoot(withStyles(styles)(withRouter(Channels)))
