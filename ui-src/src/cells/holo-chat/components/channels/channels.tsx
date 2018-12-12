import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import withRoot from '../../../../withRoot'
import { withRouter, Route, RouteComponentProps } from 'react-router-dom'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { Channel as ChannelType, ChannelSpec } from '../../types/model/channel'
import NewChannel from '../../containers/newChannelContainer'
import { Subject as SubjectType } from '../../types/model/subject'
import Badge from '@material-ui/core/Badge'

const updateInterval = 10000

import {
  GetMyChannels,
  CreateChannel
} from '../../actions'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    boxShadow: 'none'
  },
  desktop: {
    backgroundColor: theme.palette.background.paper
  },
  mobile: {
    backgroundColor: theme.palette.primary.main
  },
  panel: {
    boxShadow: 'none'
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
  isMobile: boolean
}

export interface StateProps {
  channels: Array<ChannelType>,
  subjects: Array<SubjectType>
}

export interface DispatchProps {
  init: () => void,
  getMyChannels: typeof GetMyChannels.sig,
  getSubjects: (channelAddress: string) => void,
  getAllMembers: () => void,
  newChannel: typeof CreateChannel.sig,
  setChannelAddress: (channelAddress: String) => void,
  setSubjectAddress: (subjectAddress: String) => void
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
    this.props.init()
    this.props.getMyChannels(undefined).catch((err: Error) => {
      console.log(err)
    })
    this.getChannelsInterval = setInterval(this.props.getMyChannels, updateInterval)
  }

  componentWillUnmount () {
    clearInterval(this.getChannelsInterval)
  }

  handleNewChannelButtonClick = () => {
    this.props.getAllMembers()
    this.setState({ modalOpen: true })
  }

  addNewChannel = (channelSpec: ChannelSpec) => {
    this.setState({ modalOpen: false })
    this.props.newChannel(channelSpec)
      .then((address: string) => {
        console.log(address)
        this.props.history.push(`/holo-chat/channel/${address}`)
        this.props.getMyChannels(undefined).catch((err: Error) => {
          console.log(err)
        })
      })
      .catch((err: Error) => {
        console.log(err)
      })
  }

  onHandleClose = () => {
    this.setState({ modalOpen: false })
  }

  getSubjects = (channelAddress: string) => {
    // console.log(`get subjects for ${channelAddress}`)
    this.props.history.push(`/holo-chat/channel/${channelAddress}`)
    this.props.setChannelAddress(channelAddress)
    this.props.getSubjects(channelAddress)
  }

  getMessages = (subjectAddress: string) => {
    // console.log(`get messages for ${subjectAddress}`)
    this.props.history.push(`/holo-chat/subject/${subjectAddress}`)
    this.props.setSubjectAddress(subjectAddress)
  }

  formatSubjectLabel = (subject: string): string => {
    return `${subject.substr(0, 15)}...`
  }

  formatChannelName = (name: string): string => {
    if (name.length > 20) {
      return `${name.substr(0, 20)}...`
    } else {
      return name
    }
  }

  render (): JSX.Element {
    const { classes, channels, title, subjects, isPublic, isMobile } = this.props
    return (
    <div className={classNames(classes.root, isMobile && classes.mobile, !isMobile && classes.desktop)}>
      <Button id='AddChannel' mini={true} onClick={this.handleNewChannelButtonClick} className={classNames(classes.addButton, isMobile && classes.mobile, !isMobile && classes.desktop)}>
        <AddIcon/>
      </Button>
      <Typography variant={isMobile ? 'h6' : 'h5'} className={classNames(classes.title, isMobile && classes.mobile, !isMobile && classes.desktop)}>
        {title}
      </Typography>
        {channels.filter(function (channel: ChannelType) {
          return channel.public === isPublic
        }).map((channel: ChannelType, index: number) => (
        <div key={index} className={classes.root}>
            <Route
              render={ () => (
                <ExpansionPanel className={classNames(classes.panel, isMobile && classes.mobile, !isMobile && classes.desktop)}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => this.getSubjects(channel.address)}>
                    <Typography variant={isMobile ? 'subtitle2' : 'h6'}>{this.formatChannelName(channel.name)}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                      {
                        subjects.filter(function (subject: SubjectType) {
                          return subject.channel_address === channel.address
                        }).map((subject: SubjectType, subjectIndex: number) => (
                          <Badge key={subjectIndex} badgeContent={3} color='primary' classes={{ badge: classes.badge }}>
                            <Chip
                              label={this.formatSubjectLabel(subject.name)}
                              className={classes.chip}
                              onClick={() => this.getMessages(subject.address)}
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
      <NewChannel isPublic={isPublic} open={this.state.modalOpen} onSubmit={this.addNewChannel} onHandleClose={this.onHandleClose}/>
    </div>
    )
  }
}

// typecase after withRouter exposes only non-router props to external use. This is because withRouter will add those props automatically
export default withRoot(withStyles(styles)(withRouter(Channels)))
