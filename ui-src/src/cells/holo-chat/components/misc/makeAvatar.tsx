
import * as React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Identity } from '../../types/model/identity'

// used to check if the avatar string is valid base64 encoding.
// Does not check if it decodes to a valid image
// const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export const MakeAvatar = (props: {user: Identity}) => {
  const { user } = props
  if (user.avatar && user.avatar.length > 0) {
    return (<Avatar src={user.avatar}/>)
  } else if (user.handle) {
    return (<Avatar>{user.handle[0]}</Avatar>)
  } else {
  	return (<Avatar>?</Avatar>)
  }
}
