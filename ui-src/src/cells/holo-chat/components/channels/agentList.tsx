import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Input from '@material-ui/core/Input'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import withRoot from '../../../../withRoot'
import { MakeAvatar } from '../misc/makeAvatar'
// import {Route} from 'react-router-dom'
import deburr from 'lodash/deburr';
import keycode from 'keycode';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { Identity } from '../../types/model/identity'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    minHeight: 300,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    float: 'right',
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  filter: {
    width: '100%',
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit
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

  // handleKeyDown = event => {
  //   const { filterString, selectedUsers } = this.state;
  //   if (selectedUsers.length && !filterString.length && keycode(event) === 'backspace') {
  //     this.setState({
  //       selectedUsers: selectedUsers.slice(0, selectedUsers.length - 1),
  //     });
  //   }
  // };
  //
  // handleInputChange = event => {
  //   this.setState({ inputValue: event.target.value });
  // };
  //
  // handleChange = user => {
  //   let { selectedUsers } = this.state;
  //
  //   if (selectedUsers.indexOf(user) === -1) {
  //     selectedUsers = [...selectedUsers, user];
  //   }
  //
  //   this.setState({
  //     filterString: '',
  //     selectedUsers,
  //   });
  // };
  //
  // handleDelete = user => () => {
  //   this.setState(state => {
  //     const selectedUsers = [...state.selectedUsers];
  //     selectedUsers.splice(selectedUsers.indexOf(user), 1);
  //     return { selectedUsers };
  //   });
  // };
  //
  // render() {
  //   const { classes } = this.props;
  //   const { inputValue, selectedItem } = this.state;
  //
  //   return (
  //     <Downshift
  //       id="downshift-multiple"
  //       inputValue={inputValue}
  //       onChange={this.handleChange}
  //       selectedItem={selectedItem}
  //     >
  //       {({
  //         getInputProps,
  //         getItemProps,
  //         isOpen,
  //         inputValue: inputValue2,
  //         selectedItem: selectedItem2,
  //         highlightedIndex,
  //       }) => (
  //         <div className={classes.container}>
  //           {renderInput({
  //             fullWidth: true,
  //             classes,
  //             InputProps: getInputProps({
  //               startAdornment: selectedItem.map(item => (
  //                 <Chip
  //                   key={item}
  //                   tabIndex={-1}
  //                   label={item}
  //                   className={classes.chip}
  //                   onDelete={this.handleDelete(item)}
  //                 />
  //               )),
  //               onChange: this.handleInputChange,
  //               onKeyDown: this.handleKeyDown,
  //               placeholder: 'Select multiple countries',
  //             }),
  //             label: 'Label',
  //           })}
  //           {isOpen ? (
  //             <Paper className={classes.paper} square>
  //               {getSuggestions(inputValue2).map((suggestion, index) =>
  //                 renderSuggestion({
  //                   suggestion,
  //                   index,
  //                   itemProps: getItemProps({ item: suggestion.label }),
  //                   highlightedIndex,
  //                   selectedItem: selectedItem2,
  //                 }),
  //               )}
  //             </Paper>
  //           ) : null}
  //         </div>
  //       )}
  //     </Downshift>
  //   );
  // }



   render () {
    const { classes, users } = this.props
    return (
      <div className={classes.root}>
        <Input
          id='filter-bar'
          placeholder='To:'
          value={this.state.filterString}
          onChange={this.onFilterStringChange}
        />
        <List id='users' component='nav'>
          {
            users
            .filter((user) => user.handle.toLowerCase().search(this.state.filterString.toLowerCase()) !== -1)
            .map((user, i) => {
              return (
              <ListItem key={i} button={true} value={user.hash} className={classes.listItem} onClick={this.onRowClick(user)}>
                <MakeAvatar user={user}/>
                <ListItemText primary={user.handle}/>
                <Checkbox
                  checked={this.state.selectedUsers.indexOf(user) !== -1}
                />
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
