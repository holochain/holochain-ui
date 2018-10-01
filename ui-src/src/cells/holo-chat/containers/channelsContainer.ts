
import { connect } from 'react-redux'
import Channels from '../components/channels/channels'
// import channelData from '../data/channels.json'
// import {HoloChatState} from '../reducer'
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



const mapStateToProps = (state: any) => {
  return {
    channels: state.holoChat.myChannels,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  	getMyChannels: () => { dispatch(GetMyChannels.create({})) },
  	newChannel: (channelSpec: ChannelSpec) => { dispatch(CreateCustomChannel.create(channelSpec)) },
    setActiveChannel: (channel: Channel) => { dispatch(SetActiveChannel(channel))},
    getUsers: () => { dispatch(GetUsers.create({}) ) },
    personasList: (then?: Function) => { dispatch(personasList(then)) },
    setIdentity: (identity: IdentitySpec) => { dispatch(SetIdentity.create(identity)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
