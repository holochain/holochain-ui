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
import { Stream as StreamType, StreamSpec } from '../../types/model/stream'
import NewStream from '../../containers/newStreamContainer'
import { Subject as SubjectType } from '../../types/model/subject'
import Badge from '@material-ui/core/Badge'

const updateInterval = 10000

import {
  GetMyStreams,
  CreateStream,
  Init,
  GetAllMembers
} from '../../actions'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    boxShadow: 'none',
    clear: 'both'
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
  streams: Array<StreamType>,
  subjects: Array<SubjectType>
}

export interface DispatchProps {
  init: typeof Init.sig,
  getMyStreams: typeof GetMyStreams.sig,
  getSubjects: (channelAddress: string) => void,
  getAllMembers: typeof GetAllMembers.sig,
  newStream: typeof CreateStream.sig,
  setStreamAddress: (streamAddress: String) => void,
  setSubjectAddress: (subjectAddress: String) => void
}

export interface RouterProps extends RouteComponentProps<{stream: string, subject?: string}> {}
export type Props = OwnProps & StateProps & DispatchProps

export interface State {
  modalOpen: boolean
}

class Streams extends React.Component<Props & RouterProps, State> {
  getStreamsInterval: any

  constructor (props: Props & RouterProps) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  componentDidMount () {
    this.getStreamsInterval = setInterval(this.props.getMyStreams, updateInterval)
  }

  componentWillUnmount () {
    clearInterval(this.getStreamsInterval)
  }

  handleNewStreamButtonClick = () => {
    this.props.getAllMembers({}).catch((err: Error) => {
      console.log(err)
    })
    this.setState({ modalOpen: true })
  }

  addNewStream = (streamSpec: StreamSpec) => {
    this.setState({ modalOpen: false })
    this.props.newStream(streamSpec)
      .then((address: string) => {
        console.log(address)
        this.props.history.push(`/holo-chat/stream/${address}`)
        this.props.getMyStreams(undefined).catch((err: Error) => {
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

  getSubjects = (streamAddress: string) => {
    console.log(`get subjects for ${streamAddress}`)
    this.props.history.push(`/holo-chat/stream/${streamAddress}`)
    this.props.setStreamAddress(streamAddress)
    this.props.getSubjects(streamAddress)
  }

  getMessages = (streamAddress: string, subjectAddress: string) => {
    // console.log(`get messages for ${subjectAddress}`)
    this.props.history.push(`/holo-chat/stream/${streamAddress}/subject/${subjectAddress}`)
    this.props.setSubjectAddress(subjectAddress)
  }

  formatSubjectLabel = (subject: string): string => {
    return `${subject.substr(0, 15)}...`
  }

  formatStreamName = (name: string): string => {
    if (name.length > 20) {
      return `${name.substr(0, 20)}...`
    } else {
      return name
    }
  }

  render (): JSX.Element {
    const { classes, streams, title, subjects, isPublic, isMobile } = this.props
    return (
    <div className={classNames(classes.root, isMobile && classes.mobile, !isMobile && classes.desktop)}>
      <Button id='AddStream' mini={true} onClick={this.handleNewStreamButtonClick} className={classNames(classes.addButton, isMobile && classes.mobile, !isMobile && classes.desktop)}>
        <AddIcon/>
      </Button>
      <Typography variant={isMobile ? 'h6' : 'h5'} className={classNames(classes.title, isMobile && classes.mobile, !isMobile && classes.desktop)}>
        {title}
      </Typography>
        {streams.filter(function (stream: StreamType) {
          return stream.public === isPublic
        }).map((stream: StreamType, index: number) => (
        <div key={index} className={classes.root}>
            <Route
              render={ () => (
                <ExpansionPanel className={classNames(classes.panel, isMobile && classes.mobile, !isMobile && classes.desktop)}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => this.getSubjects(stream.address)}>
                    <Typography variant={isMobile ? 'subtitle2' : 'h6'}>{this.formatStreamName(stream.name)}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                      {
                        subjects.filter(function (subject: SubjectType) {
                          return subject.stream_address === stream.address
                        }).map((subject: SubjectType, subjectIndex: number) => (
                          <Badge key={subjectIndex} badgeContent={3} color='primary' classes={{ badge: classes.badge }}>
                            <Chip
                              label={this.formatSubjectLabel(subject.name)}
                              className={classes.chip}
                              onClick={() => this.getMessages(stream.address, subject.address)}
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
      <NewStream isPublic={isPublic} open={this.state.modalOpen} onSubmit={this.addNewStream} onHandleClose={this.onHandleClose}/>
    </div>
    )
  }
}

// typecase after withRouter exposes only non-router props to external use. This is because withRouter will add those props automatically
export default withRoot(withStyles(styles)(withRouter(Streams)))
