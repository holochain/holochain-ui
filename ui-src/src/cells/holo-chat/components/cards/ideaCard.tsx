// import * as React from 'react';
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import withRoot from '../../../../withRoot'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Share from '@material-ui/icons/Share'
import Badge from '@material-ui/core/Badge'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import Publish from '@material-ui/icons/Publish'
import IconButton from '@material-ui/core/IconButton'
import Info from '@material-ui/icons/Info'
import List from '@material-ui/core/List'
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemText } from '@material-ui/core'
import MessageView from '../messages/messageView'
import * as constants from '../../constants'
import * as React from 'react'

const styles: StyleRulesCallback = (theme: Theme) => ({
  card: {
    display: 'block',
    width: 362,
    minWidth: 275
  },
  button: {
    minWidth: 25,
    width: 25
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`
  }
})

interface IdeaCardProps {
  classes: any,
  idea: any,
  addCard: any
}

class IdeaCard extends React.Component<IdeaCardProps & RouteComponentProps<{}>, {}> {
  state = {
    open: false,
    openErrand: false
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleClickErrandOpen = () => {
    this.setState({ openErrand: true })
  }
  handleCloseErrand = () => {
    this.setState({ openErrand: false })
  }
  handleThumbsUp = () => {
    console.log('up')
    // this.togglePopover()
  }
  handleThumbsDown = () => {
    console.log('down')
    // this.togglePopover()
  }
  handleErrand = () => {
    console.log('Errand')
    this.props.addCard({ id: 'backlogid1111', title: this.props.idea.title, description: this.props.idea.description }, 'Inbox')
    this.props.addCard({ id: 'backlogid1112', title: 'Describe how ' + this.props.idea.title + ' works', description: 'Write out the instructions for each state' }, 'Inbox')
    this.props.addCard({ id: 'backlogid1113', title: 'Sketch of ' + this.props.idea.title, description: 'Sketch drawing' }, 'Inbox')
    this.setState({ openErrand: false })
  }

  render () {
    const { classes, idea } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='display1'>
              {idea.title}
            </Typography>
            <Typography component='p'>{idea.description}</Typography>
          </CardContent>
          <CardActions>
            <IconButton
              className={classes.button}
              onClick={this.handleClickOpen}
              aria-label='ThumbDown'
            >
              <Info />
            </IconButton>
            <Share />
            <Badge
              id='thumbsUpBadge'
              className={classes.badge}
              badgeContent={idea.upVotes}
              color='secondary'
            >
              <IconButton
                className={classes.button}
                onClick={this.handleThumbsUp}
                aria-label='ThumbUp'
              >
                <ThumbUp />
              </IconButton>
            </Badge>
            <Badge
              className={classes.badge}
              badgeContent={idea.downVotes}
              color='secondary'
            >
              <IconButton
                className={classes.button}
                onClick={this.handleThumbsDown}
                aria-label='ThumbDown'
              >
                <ThumbDown />
              </IconButton>
            </Badge>
            <IconButton
              className={classes.button}
              onClick={this.handleClickErrandOpen}
              aria-label='Errand'
            >
              <Publish />
            </IconButton>
          </CardActions>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>New Idea</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add more detail to the Idea so it can be promoted to a Top Idea.
            </DialogContentText>
            <List>
              <ListItem key={1} dense={true} className={classes.listItem}>
                <MessageView message={constants.messages[0]} />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleClose} color='primary'>
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openErrand}
          onClose={this.handleCloseErrand}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Integraste with Errand</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select what you want to add to Errand
            </DialogContentText>
            <List>
              <ListItem key={1} dense={true} className={classes.listItem}>
                <ListItemText>Add a single item</ListItemText>
              </ListItem>
              <ListItem key={2} dense={true} className={classes.listItem}>
                <ListItemText>Add a feature group of items</ListItemText>
              </ListItem>
              <ListItem key={2} dense={true} className={classes.listItem}>
                <ListItemText>Add new process board</ListItemText>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseErrand} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleErrand} color='primary'>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(withRouter(IdeaCard)))
