import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import ListItemText from '@material-ui/core/ListItemText'
import withRoot from '../../../../withRoot'
import MakeAvatar from '../misc/makeAvatar'

import { Member } from '../../types/model/stream'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    height: 500,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    float: 'right',
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  list: {
    overflow: 'auto',
    maxHeight: '100%'
  },
  filter: {
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  chip: {
    margin: theme.spacing.unit
  },
  input: {
    width: '100%',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

export interface AgentListProps {
  classes?: any,
  members: Array<Member>,
  selectionChanged?: (selectedUsers: Array<Member>) => void
}

export interface AgentListState {
  filterString: string,
  selectedUsers: Array<Member>
}

class AgentList extends React.Component<AgentListProps, AgentListState> {
  constructor (props: AgentListProps) {
    super(props)
    this.state = {
      filterString: '',
      selectedUsers: []
    }
  }

  onFilterStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      filterString: e.target.value
    })
  }

  onRowClick = (value: Member) => () => {
    const selected = this.state.selectedUsers
    const currentIndex = selected.indexOf(value)
    const newSelected = [...selected]

    if (currentIndex === -1) {
      newSelected.push(value)
    } else {
      newSelected.splice(currentIndex, 1)
    }

    this.setState({
      ...this.state,
      selectedUsers: newSelected
    })

    if (this.props.selectionChanged) {
      this.props.selectionChanged(newSelected)
    }
  }

  render () {
    const { classes, members } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.filter}>
          <div>
            {
              this.state.selectedUsers.map((person: Member) => (
                <Chip
                  key={person.agentId}
                  avatar={<MakeAvatar member={person} />}
                  label={person.handle}
                  onDelete={this.onRowClick(person)}
                  className={classes.chip}
                />))
            }
          </div>
          <div>
            <Input
              id='filter-bar'
              placeholder='To:'
              value={this.state.filterString}
              onChange={this.onFilterStringChange}
              className={classes.input}
            />
          </div>
        </div>
        <List id='users' className={classes.list}>
          {
            members
            .filter((member) => member.handle.toLowerCase().search(this.state.filterString.toLowerCase()) !== -1)
            .map((member, i) => {
              return (
              <ListItem key={i} button={true} value={member.agentId} className={classes.listItem} onClick={this.onRowClick(member)}>
                <MakeAvatar member={member}/>
                <ListItemText primary={member.handle} />
              </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }

}

export default withRoot(withStyles(styles)(AgentList))
