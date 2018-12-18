import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  Grid,
  Paper,
  Dialog
} from '@material-ui/core'

import StreamsContainer from '../containers/streamsContainer'
import MessagesContainer from '../containers/messagesContainer'
import ProfileContainer from '../../holo-vault/containers/profileContainer'

import {
  Profile
} from '../../holo-vault/types/profile'

import {
  Init
} from '../actions'

import {
  GetProfiles,
  SetCurrentProfile
} from '../../holo-vault/actions'

interface OwnProps {
  classes?: any
}

interface State {
  readonly profileDialogOpen: boolean
}

interface StateProps {

}

interface DispatchProps {
  init: typeof Init.sig,
  getProfiles: typeof GetProfiles.sig
  setCurrentProfile: (profile: Profile) => void
}

type Props = OwnProps & StateProps & DispatchProps

class Chat extends React.Component<Props, State> {

  constructor (props: any) {
    super(props)
    this.state = {
      profileDialogOpen: true
    }
    this.checkProfile()
  }

  checkProfile = () => {
    this.props.init({})
    .then((result: null) => {
      console.log(result)
      this.setState({
        profileDialogOpen: false
      })
    })
    .catch(() => {
      console.log('Init failed, Profile not linked')

      this.setState({
        profileDialogOpen: true
      })

      this.props.getProfiles({})
      .then((profiles) => {
        console.log(profiles)
        const chatProfile = profiles.filter(p => p.name === 'holo-chat')[0]
        if (chatProfile) {
          this.props.setCurrentProfile(chatProfile)
        } else {
          console.log('could not find chat profile')
        }
      })
      .catch(() => {
        console.log('Retrieving profile failed')
      })
    })
  }

  render (): JSX.Element {
    const { classes } = this.props
    return (
      <div>
        <Dialog
            fullScreen={true}
            open={this.state.profileDialogOpen}
        >
          <ProfileContainer onSubmit={this.checkProfile}/>
        </Dialog>

        <Grid container={true} spacing={0} className={classes.chat}>
          <Grid item={true} xs={3} className={classes.channels}>
            <StreamsContainer {...this.props} isMobile={false} title={'Public Channels'} isPublic={true} />
            <StreamsContainer {...this.props} isMobile={false} title={'Direct Messages'} isPublic={false} />
          </Grid>
          <Grid item={true} xs={7} className={classes.messages}>
            <MessagesContainer {...this.props} isMobile={false} />
          </Grid>
          <Grid item={true} xs={2}>
            <Paper/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: Props): StateProps => {
  return {
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    init: () => dispatch(Init.create({})),
    getProfiles: () => dispatch(GetProfiles.create({})),
    setCurrentProfile: (profile: Profile) => { dispatch(SetCurrentProfile(profile)) }
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
