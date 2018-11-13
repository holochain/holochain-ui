import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import ListItemText from '@material-ui/core/ListItemText'
import withRoot from '../../../../withRoot'
import { MakeAvatar } from '../misc/makeAvatar'

import { Identity } from '../../types/model/identity'

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
  }
})

export interface AgentListProps {
  classes?: any,
  users: Array<Identity>,
  selectionChanged?: (selectedUsers: Array<Identity>) => void
}

export interface AgentListState {
  filterString: string,
  selectedUsers: Array<Identity>
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

  onRowClick = (value: Identity) => () => {
    const checked = this.state.selectedUsers
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({
      ...this.state,
      selectedUsers: newChecked
    })

    if (this.props.selectionChanged) {
      this.props.selectionChanged(newChecked)
    }
  }

  render () {
    const { classes, users } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.filter}>
          <div>
            {
              this.state.selectedUsers.map((person: Identity, index: number) => (
                <Chip
                  key={index}
                  avatar={<MakeAvatar user={person} />}
                  label={person.name}
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
            />
          </div>
        </div>
        <List id='users' className={classes.list}>
          {
            users
            .filter((user) => user.handle.toLowerCase().search(this.state.filterString.toLowerCase()) !== -1 || user.name.toLowerCase().search(this.state.filterString.toLowerCase()) !== -1)
            .map((user, i) => {
              return (
              <ListItem key={i} button={true} value={user.hash} className={classes.listItem} onClick={this.onRowClick(user)}>
                <MakeAvatar user={user}/>
                <ListItemText primary={user.handle + ' ' + user.name}/>
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
