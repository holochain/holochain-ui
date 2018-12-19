
import * as React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import deepPurple from '@material-ui/core/colors/deepPurple'
import { Member } from '../../types/model/stream'

// used to check if the avatar string is valid base64 encoding.
// Does not check if it decodes to a valid image
// const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

const styles = {
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500]
  }
}

const MakeAvatar = (props: {member: Member, classes: any}) => {
  const { member, classes } = props
  if (member.avatar && member.avatar.length > 0) {
    return (<Avatar src={member.avatar}/>)
  } else if (member.handle) {
    return (<Avatar className={classes.purpleAvatar}>{member.handle[0]}</Avatar>)
  } else {
  	return (<Avatar>?</Avatar>)
  }
}

export default withStyles(styles)(MakeAvatar)
