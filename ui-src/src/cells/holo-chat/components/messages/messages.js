import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import withRoot from '../../../../withRoot'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Message from './message'

const styles = theme => ({
  listItemMessage: {
    position: 'relative'
  }
})

class Messages extends React.Component {
  render () {
    const { classes, messages } = this.props
    return (
      <List>
        {messages.map((messageByDate, messageDateIndex) => (
          <List>
            <ListItem key={messageDateIndex} dense className={classes.listItemMessage}>
              <ListItemText className={classes.date} primary={messageByDate.date} />
            </ListItem>
            <ListItem key={messageDateIndex} dense className={classes.listItemMessage}>
              <List>
                {messageByDate.messages.map((message, index) => (
                  <ListItem key={index} dense className={classes.listItemMessage}>
                    <Message message={message} />
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </List>
        ))}
      </List>
    )
  }
}

Messages.propTypes = {
  classes: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired
}

export default withRoot(withStyles(styles)(Messages))
