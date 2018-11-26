import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { Channel as ChannelType } from '../../types/model/channel'
import withRoot from '../../../../withRoot'
import { withRouter, Route, RouteComponentProps } from 'react-router-dom'
import { Subject as SubjectType } from '../../types/model/subject'

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
  channel: ChannelType,
  index: number,
  getSubjects: Function
}

export interface State {
  expansionPanelOpen: boolean,
  subjects: Array<SubjectType>
}

export interface RouterProps extends RouteComponentProps<{}> {}

export type Props = OwnProps

class ChannelNav extends React.Component<Props & RouterProps, State> {
  unlisten: any
  constructor (props: Props & RouterProps) {
    super(props)
    this.state = {
      expansionPanelOpen: false,
      subjects: []
    }
  }

  componentWillMount () {
    this.unlisten = this.props.history.listen((location) => {
      if (location.pathname.indexOf(this.props.channel.hash) > 0) {
        console.log(`The current URL is ${location.pathname}`)
        this.props.getSubjects(this.props.channel.hash)
      }
    })
  }
  componentWillUnmount () {
    this.unlisten()
  }
  render (): JSX.Element {
    const { classes, channel, index } = this.props
    return (
    <div className={classes.root}>
        <Route
          key={index}
          render={ ({ history }) => (
            <ExpansionPanel style={{ boxShadow: 'none' }}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => history.push(`/holo-chat/channel/${channel.hash}`)}>
                <Typography variant='h6'>{channel.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  {
                    this.state.subjects.map((subject: SubjectType, subjectIndex: number) => (
                      <Chip
                        key={subjectIndex}
                        label={subject.subject}
                        className={classes.chip}
                        onClick={() => history.push(`/holo-chat/channel/${channel.hash}/subject/${subject.hash}`)}
                      />))
                  }
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            )}
        />
    </div>
    )
  }
}

// typecase after withRouter exposes only non-router props to external use. This is because withRouter will add those props automatically
export default withRoot(withStyles(styles)(withRouter(ChannelNav)))
