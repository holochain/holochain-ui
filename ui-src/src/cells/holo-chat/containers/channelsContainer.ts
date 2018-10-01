
import { connect } from 'react-redux'
import Channels, { OwnProps, StateProps, DispatchProps } from '../components/channels/channels'
import {  } from '../reducer'
import {Dispatch} from 'redux'

import {
	getMyChannels,
	createCustomChannel,
  SetActiveChannel,
  getUsers,
  setIdentity
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
  	getMyChannels: () => { dispatch(getMyChannels()) },
  	newChannel: (channelSpec: ChannelSpec) => { dispatch(createCustomChannel(channelSpec)) },
    setActiveChannel: (channel: Channel) => { dispatch(SetActiveChannel(channel))},
    getUsers: () => { dispatch(getUsers() ) },
    personasList: (then?: Function) => { dispatch(personasList(then)) },
    setIdentity: (identity: IdentitySpec) => { dispatch(setIdentity(identity)) }
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
