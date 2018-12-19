
import * as React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Member } from '../../types/model/stream'

// used to check if the avatar string is valid base64 encoding.
// Does not check if it decodes to a valid image
// const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export const MakeAvatar = (props: {member: Member}) => {
  const { member } = props
  if (member.avatar && member.avatar.length > 0) {
    return (<Avatar src={member.avatar}/>)
  } else if (member.handle) {
    return (<Avatar>{member.handle[0]}</Avatar>)
  } else {
  	return (<Avatar>?</Avatar>)
  }
}
