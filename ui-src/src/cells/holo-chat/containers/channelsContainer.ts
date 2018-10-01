
import { connect } from 'react-redux'
import Channels, { OwnProps, StateProps, DispatchProps } from '../components/channels/channels'
import {  } from '../reducer'
import {Dispatch} from 'redux'

import {
	GetMyChannels,
	CreateCustomChannel,
  SetActiveChannel,
  GetUsers,
  SetIdentity
} from '../actions'

import {
  personasList
} from '../../holo-vault/actions'

import {Channel, ChannelSpec} from '../types/model/channel'
import {IdentitySpec} from '../types/model/identity'



const mapStateToProps = (state: any, ownProps: OwnProps): StateProps => {
  return {
    channels: state.holoChat.myChannels,
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => {
  return {
  	getMyChannels: () => dispatch(GetMyChannels.create(undefined)),
  	newChannel: (channelSpec: ChannelSpec) => dispatch(CreateCustomChannel.create(channelSpec)),
    setActiveChannel: (channel: Channel) => dispatch(SetActiveChannel(channel)),
    getUsers: () => dispatch(GetUsers.create(undefined) ),
    personasList: (then?: Function) => dispatch(personasList(then)),
    setIdentity: (identity: IdentitySpec) => dispatch(SetIdentity.create(identity))
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
