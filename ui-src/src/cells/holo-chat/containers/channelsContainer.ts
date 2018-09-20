
import { connect } from 'react-redux'
import Channels from '../components/channels/channels'
// import channelData from '../data/channels.json'
// import {HoloChatState} from '../reducer'
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



const mapStateToProps = (state: any) => {
  return {
    channels: state.holoChat.myChannels,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  	getMyChannels: () => { dispatch(getMyChannels()) },
  	newChannel: (channelSpec: ChannelSpec) => { dispatch(createCustomChannel(channelSpec)) },
    setActiveChannel: (channel: Channel) => { dispatch(SetActiveChannel(channel))},
    getUsers: () => { dispatch(getUsers() ) },
    personasList: (then?: Function) => { dispatch(personasList(then)) },
    setIdentity: (identity: IdentitySpec) => { dispatch(setIdentity(identity)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
